import ProfileCard from "@/components/ProfileCard";
import Heatmap from "@/components/Heatmap";
import RepoTable from "@/components/RepoTable";
import RecentCommits from "@/components/RecentCommits";

export default async function UserPage({ params }: { params: { username: string } }) {
  const { username } = params;
  return (
    <main className="p-4">
      <ProfileCard username={username} />
      <Heatmap data={[]} />
      <RepoTable repos={[]} />
      <RecentCommits commits={[]} />
    </main>
  );
}
