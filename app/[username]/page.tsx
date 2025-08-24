import ProfileCard from "@/components/ProfileCard";
import Heatmap from "@/components/Heatmap";
import RepoTable from "@/components/RepoTable";
import RecentCommits from "@/components/RecentCommits";
import { getContributions, getRecentEvents, GitHubError } from "@/lib/github";

export default async function Page({
  params,
}: {
  params: { username: string };
}) {
  const { username } = params;

  try {
    const calendar = await getContributions(username);
    const recent = await getRecentEvents(username);

    return (
      <main className="p-4">
        <ProfileCard username={username} />
        <Heatmap data={calendar} />
        <RepoTable repos={recent.repos} />
        <RecentCommits commits={recent.commits} />
      </main>
    );
  } catch (error) {
    if (error instanceof GitHubError && error.status === 403) {
      const resetTime = error.resetAt?.toLocaleTimeString() || "unknown time";
      return (
        <main className="p-4">
          <div className="bg-red-50 border border-red-200 p-4 rounded">
            <h2 className="text-red-800 font-bold">Rate Limit Exceeded</h2>
            <p className="text-red-700">
              GitHub API rate limit exceeded. Please try again after {resetTime}
              .
            </p>
          </div>
        </main>
      );
    }

    return (
      <main className="p-4">
        <div className="bg-red-50 border border-red-200 p-4 rounded">
          <h2 className="text-red-800 font-bold">Error</h2>
          <p className="text-red-700">
            Failed to load GitHub data. Please try again later.
          </p>
        </div>
      </main>
    );
  }
}
