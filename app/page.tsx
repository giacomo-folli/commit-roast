import UsernameForm from "@/components/UsernameForm";

export default function Home() {
  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">GitHub Activity Viewer</h1>
      <UsernameForm />
    </main>
  );
}
