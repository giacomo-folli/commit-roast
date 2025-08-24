"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Header() {
  const { data: session, status } = useSession();

  return (
    <header className="border-b-2 border-black p-4 flex justify-between items-center bg-white">
      <Link href="/" className="font-bold text-2xl">
        GitHub Activity
      </Link>
      <div>
        {status === "loading" ? (
          <span>Loading...</span>
        ) : session?.user ? (
          <div className="flex gap-4 items-center">
            <span className="font-bold">{session.user.name}</span>
            <button
              onClick={() => signOut()}
              className="border-2 border-black px-4 py-2 bg-white text-black"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <button
            onClick={() => signIn("github")}
            className="border-2 border-black px-4 py-2 bg-black text-white"
          >
            Sign in with GitHub
          </button>
        )}
      </div>
    </header>
  );
}
