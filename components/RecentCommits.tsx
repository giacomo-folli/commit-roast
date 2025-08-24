interface Commit {
  repo: string;
  message: string;
  date: string;
  url: string;
}

export default function RecentCommits({ commits }: { commits: Commit[] }) {
  return (
    <>
      <ul className="border-2 border-black">
        <div className="text-left px-2 border-b-2 border-black font-bold">
          Commits
        </div>
        {commits.map((c, i) => (
          <li
            key={i}
            className="flex items-center justify-between p-2 border-b border-black last:border-b-0"
          >
            <div className="">
              <a href={c.url} className="underline line-clamp-1">
                {c.message}
              </a>
            </div>
            <div className="min-w-fit">
              {c.repo.split("/")[1]} - {new Date(c.date).toLocaleString()}
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
