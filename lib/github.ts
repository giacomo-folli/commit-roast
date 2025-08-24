import { Octokit } from "octokit";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function getOctokit() {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken || process.env.GITHUB_TOKEN;
  return token ? new Octokit({ auth: token }) : new Octokit();
}

export async function fetchGraphQL(
  query: string,
  variables: Record<string, unknown>,
) {
  const octokit = await getOctokit();
  return octokit.graphql(query, variables);
}

export type CalendarDay = { date: string; count: number };

export class GitHubError extends Error {
  constructor(
    message: string,
    public readonly status?: number,
    public readonly resetAt?: Date,
  ) {
    super(message);
    this.name = "GitHubError";
  }
}

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

  try {
    const result = (await fetchGraphQL(query, {
      username,
      from,
      to,
    })) as CalendarResponse;

    // Add validation for the response
    if (!result?.user) {
      throw new GitHubError(`User ${username} not found`);
    }

    if (!result.user.contributionsCollection?.contributionCalendar) {
      throw new GitHubError("Unable to fetch contribution calendar");
    }

    return transformCalendar(result);
  } catch (error: any) {
    if (error.status === 403 && error.headers?.["x-ratelimit-reset"]) {
      const resetAt = new Date(
        Number(error.headers["x-ratelimit-reset"]) * 1000,
      );
      const waitTime = resetAt.getTime() - Date.now();

      // If reset is within 10 seconds, wait and retry
      if (waitTime > 0 && waitTime <= 10000) {
        await new Promise((resolve) => setTimeout(resolve, waitTime));
        return getContributions(username, from, to);
      }

      throw new GitHubError("GitHub API rate limit exceeded", 403, resetAt);
    }

    if (error instanceof GitHubError) {
      throw error;
    }

    throw new GitHubError(
      error.message || "Failed to fetch contributions",
      error.status,
    );
  }
}

interface CalendarResponse {
  user?: {
    contributionsCollection?: {
      contributionCalendar?: {
        weeks: {
          contributionDays: { date: string; contributionCount: number }[];
        }[];
      };
    };
  };
}

export function transformCalendar(data: CalendarResponse): CalendarDay[] {
  const days: CalendarDay[] = [];
  const weeks =
    data?.user?.contributionsCollection?.contributionCalendar?.weeks ?? [];

  for (const week of weeks) {
    if (week.contributionDays) {
      for (const day of week.contributionDays) {
        days.push({ date: day.date, count: day.contributionCount });
      }
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
  try {
    const okt = await getOctokit();
    const { data } = await okt.request("GET /users/{username}/events", {
      username,
      per_page: 100,
      headers: {
        timeout: "5000", // Add 5s timeout
      },
    });

    if (!Array.isArray(data)) {
      throw new GitHubError("Invalid response format");
    }

    return transformEvents(data as GitHubEvent[]);
  } catch (error: any) {
    if (
      error.status === 403 &&
      error.response?.headers?.["x-ratelimit-reset"]
    ) {
      const resetAt = new Date(
        Number(error.response.headers["x-ratelimit-reset"]) * 1000,
      );
      const waitTime = resetAt.getTime() - Date.now();

      // If reset is within 10 seconds, wait and retry
      if (waitTime > 0 && waitTime <= 10000) {
        await new Promise((resolve) => setTimeout(resolve, waitTime));
        return getRecentEvents(username);
      }

      throw new GitHubError("GitHub API rate limit exceeded", 403, resetAt);
    }

    if (error.status === 404) {
      throw new GitHubError(`User ${username} not found`, 404);
    }

    if (error instanceof GitHubError) {
      throw error;
    }

    throw new GitHubError(
      error.message || "Failed to fetch events",
      error.status,
    );
  }
}

interface GitHubEvent {
  type: string;
  repo: { name: string };
  created_at: string;
  payload: { commits?: { sha: string; message: string }[] };
}

export function transformEvents(events: GitHubEvent[]): {
  commits: Commit[];
  repos: RepoStat[];
} {
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
