"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

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
import { CSVLink } from "react-csv";

// Define props type
interface BarChartProps {
  data: {
    accountType: string;
    totalSessions: number;
    averageDuration: number | undefined;
  }[];
  title?: string;
  description?: string;
}

const chartConfig = {
  totalSessions: {
    label: "Total Sessions",
    color: "hsl(var(--chart-1))", // Adjust the color as needed
  },
  averageDuration: {
    label: "Average Duration (min)",
    color: "hsl(var(--chart-2))", // Adjust the color as needed
  },
} satisfies ChartConfig;

const UserBehaviorChart = ({
  data,
  title = "User Behavior Analysis",
  description = "Sessions and Average Duration per Account Type",
}: BarChartProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="accountType"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <YAxis />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar
              dataKey="totalSessions"
              fill="var(--color-totalSessions)"
              radius={4}
            />
            <Bar
              dataKey="averageDuration"
              fill="var(--color-averageDuration)"
              radius={4}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <CSVLink data={data}>Download CSV</CSVLink>
      </CardFooter>
    </Card>
  );
};

export default UserBehaviorChart;
