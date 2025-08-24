interface Commit {
  repo: string;
  message: string;
  date: string;
  url: string;
}

export default function RecentCommits({ commits }: { commits: Commit[] }) {
  return (
    <ul className="border-2 border-black">
      {commits.map((c, i) => (
        <li
          key={i}
          className="flex items-center justify-between p-2 border-b border-black last:border-b-0"
        >
          <div>
            <a href={c.url} className="underline">
              {c.message}
            </a>
          </div>
          <div>
            ({c.repo} - {c.date})
          </div>
        </li>
      ))}
    </ul>
  );
}
