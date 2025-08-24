interface Repo {
  name: string;
  commits: number;
}

export default function RepoTable({ repos }: { repos: Repo[] }) {
  return (
    <table className="min-w-full border-2 border-black mb-4">
      <thead>
        <tr>
          <th className="text-left px-2 border-b-2 border-black">Repo</th>
          <th className="text-left px-2 border-b-2 border-black">Commits</th>
        </tr>
      </thead>
      <tbody>
        {repos.map((r) => (
          <tr key={r.name} className="border-b border-black last:border-b-0">
            <td className="px-2">{r.name}</td>
            <td className="px-2">{r.commits}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
