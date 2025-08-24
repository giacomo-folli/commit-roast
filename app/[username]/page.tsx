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
      <main className="p-4 space-y-4">
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
          <div className="border-2 border-black p-4 text-red-600">
            <h2 className="font-bold">Rate Limit Exceeded</h2>
            <p>
              GitHub API rate limit exceeded. Please try again after {resetTime}
              .
            </p>
          </div>
        </main>
      );
    }

    return (
      <main className="p-4">
        <div className="border-2 border-black p-4 text-red-600">
          <h2 className="font-bold">Error</h2>
          <p>Failed to load GitHub data. Please try again later.</p>
        </div>
      </main>
    );
  }
}
