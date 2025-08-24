"use client";

import type { CalendarDay } from "@/lib/github";
import {
  ResponsiveContainer,
  ScatterChart,
  XAxis,
  YAxis,
  Tooltip,
  Scatter,
} from "recharts";

const COLORS = ["#ebebeb", "#d5d5d5", "#a9a9a9", "#595959", "#111111"];

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

  const monthLabels = heatData
    .map((d, i) => {
      const date = new Date(d.date);
      const month = date.getUTCMonth();
      const prevDate = i > 0 ? new Date(heatData[i - 1].date) : null;
      const prevMonth = prevDate ? prevDate.getUTCMonth() : -1;
      if (month !== prevMonth) {
        return {
          week: d.week,
          label: date.toLocaleString("default", { month: "short" }),
        };
      }
      return null;
    })
    .filter(Boolean) as { week: number; label: string }[];

  const weeks = Math.max(...heatData.map((d) => d.week), 0) + 1;
  const dayLabels = ["", "Mon", "", "Wed", "", "Fri", ""];
  const CELL = 11;

  return (
    <div className="w-full h-48 border-2 border-black bg-white text-black">
      <ResponsiveContainer>
        <ScatterChart
          data={heatData}
          margin={{ right: 5, left: 5, bottom: 20, top: 20 }}
        >
          <XAxis
            type="number"
            dataKey="week"
            domain={[0, weeks]}
            tickFormatter={(v) =>
              monthLabels.find((l) => l.week === v)?.label || ""
            }
            ticks={monthLabels.map((l) => l.week)}
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#000" }}
            height={20}
            tickMargin={5}
          />
          <YAxis
            type="number"
            dataKey="day"
            tickFormatter={(v) => dayLabels[v]}
            ticks={[0, 1, 2, 3, 4, 5, 6]}
            axisLine={false}
            tickLine={false}
            reversed
            tick={{ fill: "#000" }}
            tickMargin={5}
          />
          <Tooltip
            cursor={{ stroke: "#000", strokeWidth: 2 }}
            content={({ payload }) => {
              if (payload && payload.length > 0) {
                const { date, count } = payload[0].payload as {
                  date: string;
                  count: number;
                };
                return (
                  <div className="bg-white border-2 border-black p-1 text-xs">
                    {count} {count === 1 ? "commit" : "commits"} on {date}
                  </div>
                );
              }
              return null;
            }}
          />
          <Scatter
            data={heatData}
            shape={({ cx, cy, payload }: any) => (
              <rect
                x={cx - CELL / 2}
                y={cy - CELL / 2}
                width={CELL}
                height={CELL}
                fill={getColor(payload.count)}
                stroke="#fff"
                strokeWidth={1}
              />
            )}
          />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}
