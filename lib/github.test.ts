import { describe, expect, it } from "vitest";
import { transformCalendar, transformEvents } from "./github";

describe("github transformers", () => {
  it("transformCalendar flattens calendar", () => {
    const input = {
      user: {
        contributionsCollection: {
          contributionCalendar: {
            weeks: [
              { contributionDays: [{ date: "2024-01-01", contributionCount: 1 }] },
              { contributionDays: [{ date: "2024-01-02", contributionCount: 0 }] },
            ],
          },
        },
      },
    };
    expect(transformCalendar(input)).toEqual([
      { date: "2024-01-01", count: 1 },
      { date: "2024-01-02", count: 0 },
    ]);
  });

  it("transformEvents normalizes commits and repos", () => {
    const events = [
      {
        type: "PushEvent",
        repo: { name: "foo/bar" },
        created_at: "2024-01-01T00:00:00Z",
        payload: {
          commits: [
            { sha: "a", message: "first" },
            { sha: "b", message: "second" },
          ],
        },
      },
      {
        type: "PushEvent",
        repo: { name: "foo/baz" },
        created_at: "2024-01-02T00:00:00Z",
        payload: { commits: [{ sha: "c", message: "third" }] },
      },
      { type: "IssuesEvent" },
    ];
    expect(transformEvents(events)).toEqual({
      commits: [
        {
          repo: "foo/bar",
          message: "first",
          date: "2024-01-01T00:00:00Z",
          url: "https://github.com/foo/bar/commit/a",
        },
        {
          repo: "foo/bar",
          message: "second",
          date: "2024-01-01T00:00:00Z",
          url: "https://github.com/foo/bar/commit/b",
        },
        {
          repo: "foo/baz",
          message: "third",
          date: "2024-01-02T00:00:00Z",
          url: "https://github.com/foo/baz/commit/c",
        },
      ],
      repos: [
        { name: "foo/bar", commits: 2 },
        { name: "foo/baz", commits: 1 },
      ],
    });
  });
});
