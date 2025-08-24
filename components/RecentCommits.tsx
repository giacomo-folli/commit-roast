interface Commit {
  repo: string;
  message: string;
  date: string;
  url: string;
}

export default function RecentCommits({ commits }: { commits: Commit[] }) {
  return (
    <ul>
      {commits.map((c, i) => (
        <li key={i} className="w-full flex items-center justify-between">
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
