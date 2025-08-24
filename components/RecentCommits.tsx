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
        <li key={i}>
          <a href={c.url} className="underline">
            {c.message}
          </a>{" "}({c.repo} - {c.date})
        </li>
      ))}
    </ul>
  );
}
