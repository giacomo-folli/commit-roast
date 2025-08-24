interface Repo {
  name: string;
  commits: number;
}

export default function RepoTable({ repos }: { repos: Repo[] }) {
  return (
    <table className="min-w-full border mb-1">
      <thead>
        <tr>
          <th className="text-left px-2">Repo</th>
          <th className="text-left px-2">Commits</th>
        </tr>
      </thead>
      <tbody>
        {repos.map((r) => (
          <tr key={r.name}>
            <td className="px-2">{r.name}</td>
            <td className="px-2">{r.commits}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
