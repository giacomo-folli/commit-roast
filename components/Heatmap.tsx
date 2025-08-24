"use client";

import type { CalendarDay } from "@/lib/github";
import {
  ResponsiveContainer,
  ScatterChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Scatter,
} from "recharts";

const COLORS = ["#ebedf0", "#c6e48b", "#7bc96f", "#239a3b", "#196127"];

function getColor(count: number) {
  if (count === 0) return COLORS[0];
  if (count < 5) return COLORS[1];
  if (count < 10) return COLORS[2];
  if (count < 20) return COLORS[3];
  return COLORS[4];
}

export default function Heatmap({ data }: { data: CalendarDay[] }) {
  const heatData = data.map((d, i) => {
    const date = new Date(d.date);
    return {
      week: Math.floor(i / 7),
      day: date.getUTCDay(),
      count: d.count,
      date: d.date,
    };
  });

  const weeks = Math.max(...heatData.map((d) => d.week), 0) + 1;
  const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const CELL = 11;

  return (
    <div className="w-full h-40 border-2 border-black bg-white">
      <ResponsiveContainer>
        <ScatterChart
          data={heatData}
          margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
        >
          <XAxis type="number" dataKey="week" hide domain={[0, weeks]} />
          <YAxis
            type="number"
            dataKey="day"
            tickFormatter={(v) => dayLabels[v]}
            ticks={[0, 1, 2, 3, 4, 5, 6]}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            cursor={{ stroke: "#000", strokeWidth: 1 }}
            content={({ payload }) => {
              if (payload && payload.length > 0) {
                const { date, count } = payload[0].payload as {
                  date: string;
                  count: number;
                };
                return (
                  <div className="bg-white border border-black p-1 text-xs">
                    {date}: {count} {count === 1 ? "commit" : "commits"}
                  </div>
                );
              }
              return null;
            }}
          />
          <Scatter
            data={heatData}
            shape={({ cx, cy, payload }) => (
              <rect
                x={cx - CELL / 2}
                y={cy - CELL / 2}
                width={CELL}
                height={CELL}
                fill={getColor(payload.count)}
              />
            )}
          />
          <Legend
            align="right"
            verticalAlign="top"
            iconType="square"
            payload={[
              { value: "Less", type: "square", color: COLORS[0] },
              { value: "", type: "square", color: COLORS[1] },
              { value: "", type: "square", color: COLORS[2] },
              { value: "", type: "square", color: COLORS[3] },
              { value: "More", type: "square", color: COLORS[4] },
            ]}
            wrapperStyle={{ paddingTop: 4 }}
          />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}
