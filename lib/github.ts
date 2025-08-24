import { Octokit } from "octokit";

export const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export async function fetchGraphQL(
  query: string,
  variables: Record<string, unknown>,
) {
  return octokit.graphql(query, variables);
}

export type CalendarDay = { date: string; count: number };

export async function getContributions(
  username: string,
  from?: string,
  to?: string,
): Promise<CalendarDay[]> {
  const query = `
    query ($username: String!, $from: DateTime, $to: DateTime) {
      user(login: $username) {
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }
        }
      }
    }
  `;
  const result = (await fetchGraphQL(query, {
    username,
    from,
    to,
  })) as CalendarResponse;
  return transformCalendar(result);
}

interface CalendarResponse {
  user?: {
    contributionsCollection?: {
      contributionCalendar?: {
        weeks: { contributionDays: { date: string; contributionCount: number }[] }[];
      };
    };
  };
}

export function transformCalendar(data: CalendarResponse): CalendarDay[] {
  const weeks =
    data.user?.contributionsCollection?.contributionCalendar?.weeks ?? [];
  const days: CalendarDay[] = [];
  for (const week of weeks) {
    for (const day of week.contributionDays) {
      days.push({ date: day.date, count: day.contributionCount });
    }
  }
  return days;
}

export interface Commit {
  repo: string;
  message: string;
  date: string;
  url: string;
}

export interface RepoStat {
  name: string;
  commits: number;
}

export async function getRecentEvents(
  username: string,
): Promise<{ commits: Commit[]; repos: RepoStat[] }> {
  const { data } = await octokit.request("GET /users/{username}/events", {
    username,
    per_page: 100,
  });
  return transformEvents(data as GitHubEvent[]);
}

interface GitHubEvent {
  type: string;
  repo: { name: string };
  created_at: string;
  payload: { commits?: { sha: string; message: string }[] };
}

export function transformEvents(
  events: GitHubEvent[],
): { commits: Commit[]; repos: RepoStat[] } {
  const commits: Commit[] = [];
  const repoMap: Record<string, number> = {};
  for (const event of events) {
    if (event.type !== "PushEvent" || !event.payload.commits) continue;
    for (const commit of event.payload.commits) {
      commits.push({
        repo: event.repo.name,
        message: commit.message,
        date: event.created_at,
        url: `https://github.com/${event.repo.name}/commit/${commit.sha}`,
      });
      repoMap[event.repo.name] = (repoMap[event.repo.name] || 0) + 1;
    }
  }
  const repos: RepoStat[] = Object.entries(repoMap).map(([name, count]) => ({
    name,
    commits: count,
  }));
  return { commits: commits.slice(0, 20), repos };
}
