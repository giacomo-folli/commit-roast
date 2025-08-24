"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Header() {
  const { data: session, status } = useSession();

  return (
    <header className="border-b p-4 flex justify-between items-center">
      <Link href="/" className="font-bold text-xl">
        GitHub Activity
      </Link>
      <div>
        {status === "loading" ? (
          <span>Loading...</span>
        ) : session?.user ? (
          <div className="flex gap-4 items-center">
            <span>{session.user.name}</span>
            <button
              onClick={() => signOut()}
              className="px-4 py-2 bg-gray-100 rounded"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <button
            onClick={() => signIn("github")}
            className="px-4 py-2 bg-gray-900 text-white rounded"
          >
            Sign in with GitHub
          </button>
        )}
      </div>
    </header>
  );
}
