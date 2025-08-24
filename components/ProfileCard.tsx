interface Props {
  username: string;
}

export default function ProfileCard({ username }: Props) {
  return (
    <div className="border p-4 mb-4">
      <p className="font-bold">@{username}</p>
    </div>
  );
}
