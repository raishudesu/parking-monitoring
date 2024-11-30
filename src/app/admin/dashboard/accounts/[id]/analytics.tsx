"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
export interface ParkingData {
  startTime: Date;
  parkingSpace: {
    name: string;
  };
}

// Sample data - in a real application, this would come from an API

export default function AnalyticsDashboard({
  parkingData,
}: {
  parkingData: ParkingData[];
}) {
  const [timeRange, setTimeRange] = useState("daily");

  const parkingSpaceUsage = parkingData.reduce((acc, curr) => {
    acc[curr.parkingSpace.name] = (acc[curr.parkingSpace.name] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const hourlyUsage = parkingData.reduce((acc, curr) => {
    const hour = curr.startTime.getHours();
    acc[hour] = (acc[hour] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  const parkingSpaceData = Object.entries(parkingSpaceUsage).map(
    ([name, count]) => ({
      name,
      count,
    })
  );

  const hourlyData = Array.from({ length: 24 }, (_, i) => ({
    hour: i,
    count: hourlyUsage[i] || 0,
  }));

  if (parkingData.length === 0)
    return (
      <div className="w-full p-4">
        <Card>
          <CardHeader>
            <CardTitle>User Analytics</CardTitle>
            <CardDescription>Not Available</CardDescription>
          </CardHeader>
          <CardContent>
            <Alert variant="destructive" className="mt-2">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Analytics not available</AlertTitle>
              <AlertDescription>
                Either data is not available or the user doesn&lsquo;t have any
                parking sessions.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    );

  return (
    <div className="w-full p-4">
      <h1 className="text-3xl font-bold mb-4">User Analytics</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Parking Sessions</CardTitle>
            <CardDescription>Number of parking sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{parkingData.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Most Used Parking Space</CardTitle>
            <CardDescription>Space with highest usage</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">
              {
                Object.entries(parkingSpaceUsage).reduce((a, b) =>
                  a[1] > b[1] ? a : b
                )[0]
              }
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Peak Hour</CardTitle>
            <CardDescription>Hour with most parking sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">
              {
                Object.entries(hourlyUsage).reduce((a, b) =>
                  a[1] > b[1] ? a : b
                )[0]
              }
              :00
            </p>
          </CardContent>
        </Card>
      </div>
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Detailed Analytics</CardTitle>
          <CardDescription>Visualized parking data</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="usage" className="w-full">
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="usage">Parking Space Usage</TabsTrigger>
                <TabsTrigger value="hourly">Hourly Usage</TabsTrigger>
              </TabsList>
              {/* <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select time range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select> */}
            </div>
            <TabsContent value="usage">
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={parkingSpaceData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            <TabsContent value="hourly">
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={hourlyData}>
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="count" stroke="#10b981" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
