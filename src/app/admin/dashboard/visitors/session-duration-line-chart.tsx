"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

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
import { SessionStatus, VisitorSession } from "@prisma/client";
import { CSVLink } from "react-csv";

const chartConfig = {
  avgDuration: {
    label: "Avg Duration (mins)",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

type VisitData = {
  id: string;
  visitTime: Date;
  exitTime: Date | null;
  visitorPassId: string;
  status: SessionStatus;
  // visitorPassCard: { cardNumber: number };
};

type ChartData = {
  month: string;
  visits: number;
};
function processVisitData(data: VisitData[]): ChartData[] {
  const monthMap: Record<string, number> = {};
  const monthOrder: Record<string, number> = {
    January: 1,
    February: 2,
    March: 3,
    April: 4,
    May: 5,
    June: 6,
    July: 7,
    August: 8,
    September: 9,
    October: 10,
    November: 11,
    December: 12,
  };

  data.forEach((visit) => {
    const visitDate = new Date(visit.visitTime);
    const month = visitDate.toLocaleString("default", { month: "long" });
    if (!monthMap[month]) {
      monthMap[month] = 0;
    }
    monthMap[month]++;
  });

  // Sort months based on `monthOrder`
  return Object.entries(monthMap)
    .map(([month, visits]) => ({
      month,
      visits,
    }))
    .sort((a, b) => monthOrder[a.month] - monthOrder[b.month]);
}

export function SessionDurationLineChart({ data }: { data: VisitorSession[] }) {
  const sessionDurationData = processVisitData(data);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Session Duration Analysis</CardTitle>
        <CardDescription>Number of visits over time</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            data={sessionDurationData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month" // Corrected to match processed data
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              label={{ value: "Visits", angle: -90, position: "insideLeft" }}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="visits" // Corrected to match processed data
              type="monotone"
              stroke="var(--color-avgDuration)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Displaying the number of visits for the selected time range
        </div>
        <CSVLink
          data={sessionDurationData}
          className="mt-6 bg-primary py-2 px-4 rounded-xl"
        >
          Download CSV
        </CSVLink>
      </CardFooter>
    </Card>
  );
}
