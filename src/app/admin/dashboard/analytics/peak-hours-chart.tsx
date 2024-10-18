"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PeakHoursChartProps {
  data: {
    hourCounts: number[];
    dayCounts: number[];
  };
  title?: string;
}

const PeakHoursChart: React.FC<PeakHoursChartProps> = ({
  data,
  title = "Peak Hours Analysis",
}) => {
  const hoursChartData = data.hourCounts.map((count, index) => ({
    hour: index,
    sessions: count,
  }));

  const daysChartData = data.dayCounts.map((count, index) => ({
    day: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ][index],
    sessions: count,
  }));

  const formatXAxis = (value: string | number) => {
    if (typeof value === "number") {
      return `${value}:00`;
    }
    return value.slice(0, 3);
  };

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="py-6 w-full max-h-96">
          <h3 className="text-lg font-semibold mb-2">Sessions by Hour</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={hoursChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="hour"
                tickFormatter={formatXAxis}
                label={{ value: "Hour", position: "insideBottom", offset: -5 }}
              />
              <YAxis
                label={{
                  value: "Sessions",
                  angle: -90,
                  position: "insideLeft",
                }}
              />
              <Tooltip
                labelFormatter={(label) => `Hour: ${label}:00`}
                formatter={(value) => [`${value} sessions`, "Sessions"]}
              />
              <Legend />
              <Bar dataKey="sessions" fill="#8884d8" name="Sessions" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="py-6 w-full max-h-96">
          <h3 className="text-lg font-semibold mb-2">Sessions by Day</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={daysChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="day"
                tickFormatter={formatXAxis}
                label={{ value: "Day", position: "insideBottom", offset: -5 }}
              />
              <YAxis
                label={{
                  value: "Sessions",
                  angle: -90,
                  position: "insideLeft",
                }}
              />
              <Tooltip
                labelFormatter={(label) => `Day: ${label}`}
                formatter={(value) => [`${value} sessions`, "Sessions"]}
              />
              <Legend />
              <Bar dataKey="sessions" fill="#82ca9d" name="Sessions" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PeakHoursChart;
