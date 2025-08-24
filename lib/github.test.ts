import { describe, expect, it } from "vitest";
import { transformCalendar, transformEvents } from "./github";

describe("github transformers", () => {
  it("transformCalendar returns data", () => {
    const input = { a: 1 };
    expect(transformCalendar(input)).toEqual(input);
  });

  it("transformEvents returns events", () => {
    const events = [{ id: 1 }];
    expect(transformEvents(events)).toEqual(events);
  });
});
