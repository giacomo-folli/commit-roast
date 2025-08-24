interface Props {
  username: string;
}

export default function ProfileCard({ username }: Props) {
  return (
    <div className="border-2 border-black p-4 mb-4 bg-white">
      <p className="font-bold">@{username}</p>
    </div>
  );
}
