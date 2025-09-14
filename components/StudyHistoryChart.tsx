"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface StudyHistoryChartProps {
  data: Array<{
    date: string;
    hours: number;
    sessions: number;
  }>;
}

export function StudyHistoryChart({ data }: StudyHistoryChartProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const formatTooltipDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255, 255, 255, 0.1)"
          />
          <XAxis
            dataKey="date"
            tickFormatter={formatDate}
            stroke="rgba(255, 255, 255, 0.6)"
            fontSize={12}
            tick={{ fill: "rgba(255, 255, 255, 0.8)" }}
          />
          <YAxis
            stroke="rgba(255, 255, 255, 0.6)"
            fontSize={12}
            tick={{ fill: "rgba(255, 255, 255, 0.8)" }}
            label={{
              value: "Hours",
              angle: -90,
              position: "insideLeft",
              style: { textAnchor: "middle", fill: "rgba(255, 255, 255, 0.8)" },
            }}
          />
          <Tooltip
            labelFormatter={(value) => formatTooltipDate(value)}
            formatter={(value: number, name: string) => [
              `${value.toFixed(1)} hours`,
              name === "hours" ? "Study Hours" : "Sessions",
            ]}
            contentStyle={{
              backgroundColor: "rgba(15, 23, 42, 0.95)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "12px",
              boxShadow:
                "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.1)",
              backdropFilter: "blur(10px)",
              color: "white",
            }}
            labelStyle={{ color: "white" }}
          />
          <Line
            type="monotone"
            dataKey="hours"
            stroke="url(#gradient)"
            strokeWidth={3}
            dot={{ fill: "#4facfe", strokeWidth: 2, r: 5 }}
            activeDot={{
              r: 8,
              stroke: "#4facfe",
              strokeWidth: 3,
              fill: "#4facfe",
            }}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4facfe" />
              <stop offset="100%" stopColor="#00f2fe" />
            </linearGradient>
          </defs>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
