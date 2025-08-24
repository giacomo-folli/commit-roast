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
          className={`border-2 border-black px-4 py-2 bg-white text-black ${
            error ? "border-red-600" : ""
          }`}
          value={value}
          onChange={handleChange}
          aria-label="GitHub username"
          aria-invalid={!!error}
        />
        <button className="border-2 border-black px-4 py-2 bg-black text-white" type="submit">
          View
        </button>
      </div>
      {error && <p className="text-red-600 text-sm">{error}</p>}
    </form>
  );
}
