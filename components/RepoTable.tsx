interface Repo {
  name: string;
  commits: number;
}

export default function RepoTable({ repos }: { repos: Repo[] }) {
  return (
    <table className="min-w-full border">
      <thead>
        <tr>
          <th className="text-left p-2">Repo</th>
          <th className="text-left p-2">Commits</th>
        </tr>
      </thead>
      <tbody>
        {repos.map((r) => (
          <tr key={r.name}>
            <td className="p-2">{r.name}</td>
            <td className="p-2">{r.commits}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
