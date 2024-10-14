"use client";

import { useState, useMemo } from "react";
import { TrendingUp } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function OccupancyChart({
  chartData,
}: {
  chartData: Array<{ timeLabel: string; [key: string]: number | string }>;
}) {
  const [hoveredSpace, setHoveredSpace] = useState<string | null>(null);

  // Sort the data by date
  const sortedData = useMemo(() => {
    return [...chartData].sort(
      (a, b) =>
        new Date(a.timeLabel).getTime() - new Date(b.timeLabel).getTime()
    );
  }, [chartData]);

  // Get all unique parking space names
  const allSpaces = useMemo(() => {
    const spaces = new Set<string>();
    chartData.forEach((dataPoint) => {
      Object.keys(dataPoint).forEach((key) => {
        if (key !== "timeLabel") spaces.add(key);
      });
    });
    return Array.from(spaces);
  }, [chartData]);

  // Generate a color for each parking space
  const colorMap = useMemo(() => {
    return allSpaces.reduce((acc, space, index) => {
      acc[space] = `hsl(${index * (360 / allSpaces.length)}, 70%, 50%)`;
      return acc;
    }, {} as { [key: string]: string });
  }, [allSpaces]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border rounded shadow">
          <p className="font-bold">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {entry.value.toFixed(2)} minutes
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Occupancy Rate Analysis</CardTitle>
        <CardDescription>Showing occupancy rates over time</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart
            data={sortedData}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="timeLabel"
              tickFormatter={(value) => new Date(value).toLocaleDateString()}
            />
            <YAxis
              label={{ value: "Minutes", angle: -90, position: "insideLeft" }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              onMouseEnter={(e) => setHoveredSpace(e.value)}
              onMouseLeave={() => setHoveredSpace(null)}
            />
            {allSpaces.map((space) => (
              <Area
                key={space}
                type="monotone"
                dataKey={space}
                stackId="1"
                stroke={colorMap[space]}
                fill={colorMap[space]}
                fillOpacity={
                  hoveredSpace === null || hoveredSpace === space ? 0.6 : 0.1
                }
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Data from {sortedData[0]?.timeLabel} to{" "}
              {sortedData[sortedData.length - 1]?.timeLabel}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
