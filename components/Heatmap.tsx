"use client";

import { ResponsiveContainer } from "recharts";

export default function Heatmap({ data }: { data: unknown[] }) {
  void data;
  return (
    <div className="w-full h-40 bg-gray-100 flex items-center justify-center">
      <ResponsiveContainer>
        <div>Heatmap</div>
      </ResponsiveContainer>
    </div>
  );
}
