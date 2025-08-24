import { Octokit } from "octokit";

export const octokit = new Octokit();

export async function fetchGraphQL(
  query: string,
  variables: Record<string, unknown>,
) {
  return octokit.graphql(query, variables);
}

export function transformCalendar<T>(data: T): T {
  return data;
}

export function transformEvents<T>(events: T[]): T[] {
  return events;
}
