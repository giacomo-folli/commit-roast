"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { usernameSchema } from "@/lib/validation";

export default function UsernameForm() {
  const [value, setValue] = useState("");
  const router = useRouter();

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = usernameSchema.safeParse(value);
    if (result.success) {
      router.push(`/${result.data}`);
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex gap-2" aria-busy="false">
      <input
        className="border p-2"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        aria-label="GitHub username"
      />
      <button className="bg-blue-500 text-white px-4" type="submit">
        View
      </button>
    </form>
  );
}
