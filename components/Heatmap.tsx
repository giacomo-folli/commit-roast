"use client";

import { ResponsiveContainer } from "recharts";

export default function Heatmap({ data }: { data: unknown[] }) {
  void data;
  return (
    <div className="w-full h-40 border-2 border-black flex items-center justify-center bg-white">
      <ResponsiveContainer>
        <div>Heatmap</div>
      </ResponsiveContainer>
    </div>
  );
}
