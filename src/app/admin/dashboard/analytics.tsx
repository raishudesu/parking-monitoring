"use client";

import React from "react";
import { TrendingUp, AlertTriangle } from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
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
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

type parkingUsageType = {
  id: string;
  startTime: Date;
  endTime: Date | null;
  parkingSpace: {
    name: string;
  };
}[];

// Function to process data for the chart
function getParkingSessionDataForChart(parkingSessions: parkingUsageType) {
  return parkingSessions.map((session) => {
    const startTime = new Date(session.startTime);
    const endTime = session.endTime ? new Date(session.endTime) : new Date();

    // Calculate duration in minutes (example)
    const duration = (endTime.getTime() - startTime.getTime()) / (1000 * 60);

    return {
      date: startTime.toLocaleDateString(), // Format date for the X-axis
      parkingSpace: session.parkingSpace.name, // Parking space name
      duration: duration, // Duration in minutes for the Y-axis
    };
  });
}

// Function to calculate analysis data
function getParkingSessionAnalysis(parkingSessions: parkingUsageType) {
  const totalSessions = parkingSessions.length;
  const totalDuration = parkingSessions.reduce((sum, session) => {
    const startTime = new Date(session.startTime);
    const endTime = session.endTime ? new Date(session.endTime) : new Date();
    const duration = (endTime.getTime() - startTime.getTime()) / (1000 * 60);
    return sum + duration;
  }, 0);

  const avgDuration = totalSessions > 0 ? totalDuration / totalSessions : 0;

  let maxDuration = 0;
  let longestParkingSpace = "";
  let parkingSpaceCount: Record<string, number> = {};

  parkingSessions.forEach((session) => {
    const startTime = new Date(session.startTime);
    const endTime = session.endTime ? new Date(session.endTime) : new Date();
    const duration = (endTime.getTime() - startTime.getTime()) / (1000 * 60);

    if (duration > maxDuration) {
      maxDuration = duration;
      longestParkingSpace = session.parkingSpace.name;
    }

    parkingSpaceCount[session.parkingSpace.name] =
      (parkingSpaceCount[session.parkingSpace.name] || 0) + 1;
  });

  const mostUsedParkingSpace = Object.keys(parkingSpaceCount).reduce((a, b) =>
    parkingSpaceCount[a] > parkingSpaceCount[b] ? a : b
  );
  const mostUsedSpaceCount = parkingSpaceCount[mostUsedParkingSpace];

  return {
    totalSessions,
    avgDuration,
    maxDuration,
    longestParkingSpace,
    mostUsedParkingSpace,
    mostUsedSpaceCount,
  };
}

const AnalyticsSection = ({
  parkingUsageData,
}: {
  parkingUsageData: parkingUsageType | undefined;
}) => {
  if (!parkingUsageData || parkingUsageData.length === 0) {
    return (
      <Card className="w-full shadow-md h-full">
        <CardHeader>
          <CardTitle>Campus Parking Usage</CardTitle>
          <CardDescription>
            Parking Usage Analysis for All Recorded Sessions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              No parking usage data available. Please try again later.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  let chartData, analysis;
  try {
    chartData = getParkingSessionDataForChart(parkingUsageData);
    analysis = getParkingSessionAnalysis(parkingUsageData);
  } catch (error) {
    console.error("Error processing parking data:", error);
    return (
      <Card className="w-full shadow-md h-full">
        <CardHeader>
          <CardTitle>Campus Parking Usage</CardTitle>
          <CardDescription>
            Parking Usage Analysis for All Recorded Sessions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              An error occurred while processing parking data. Please try again
              later.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full shadow-md h-full">
      <CardHeader>
        <CardTitle>Campus Parking Usage</CardTitle>
        <CardDescription>
          Parking Usage Analysis for All Recorded Sessions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <YAxis
                dataKey="duration"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                label={{
                  value: "Duration (minutes)",
                  angle: -90,
                  position: "insideLeft",
                }}
              />
              <Tooltip />
              <Line
                dataKey="duration"
                type="natural"
                stroke="var(--color-desktop)"
                strokeWidth={2}
                dot={{
                  fill: "var(--color-desktop)",
                }}
                activeDot={{
                  r: 6,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter className="self-end flex flex-col gap-4 p-4">
        <div className="flex justify-between w-full text-lg font-semibold">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-500" />
            <span>{`Total sessions: ${analysis.totalSessions}`}</span>
          </div>
          <div className="text-muted-foreground text-sm">
            {`Most used space: ${analysis.mostUsedParkingSpace} (${analysis.mostUsedSpaceCount} sessions)`}
          </div>
        </div>
        <div className="w-full text-muted-foreground border-t pt-2 border-dashed">
          <div className="flex justify-between text-sm">
            <span className="font-medium">{`Average duration:`}</span>
            <span className="font-semibold">{`${analysis.avgDuration.toFixed(
              2
            )} minutes`}</span>
          </div>
          {analysis.totalSessions > 0 && (
            <div className="flex justify-between text-sm">
              <span className="font-medium">{`Longest session:`}</span>
              <span className="font-semibold">{`${analysis.maxDuration.toFixed(
                2
              )} minutes in ${analysis.longestParkingSpace}`}</span>
            </div>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default AnalyticsSection;
