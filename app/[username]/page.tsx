import ProfileCard from "@/components/ProfileCard";
import Heatmap from "@/components/Heatmap";
import RepoTable from "@/components/RepoTable";
import RecentCommits from "@/components/RecentCommits";
import { getContributions, getRecentEvents } from "@/lib/github";

export default async function UserPage({
  params,
}: {
  params: { username: string };
}) {
  const { username } = params;
  const [calendar, recent] = await Promise.all([
    getContributions(username),
    getRecentEvents(username),
  ]);

  return (
    <main className="p-4">
      <ProfileCard username={username} />
      <Heatmap data={calendar} />
      <RepoTable repos={recent.repos} />
      <RecentCommits commits={recent.commits} />
    </main>
  );
}
