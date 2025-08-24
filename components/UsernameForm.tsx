"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { usernameSchema } from "@/lib/validation";

export default function UsernameForm() {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = usernameSchema.safeParse(value);

    if (result.success) {
      router.push(`/${result.data}`);
    } else {
      setError("Please enter a valid GitHub username");
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
    setError("");
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-2" aria-busy="false">
      <div className="flex gap-2">
        <input
          className={`border p-2 text-black ${error ? "border-red-500" : ""}`}
          value={value}
          onChange={handleChange}
          aria-label="GitHub username"
          aria-invalid={!!error}
        />
        <button className="bg-blue-500 text-white px-4" type="submit">
          View
        </button>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </form>
  );
}
