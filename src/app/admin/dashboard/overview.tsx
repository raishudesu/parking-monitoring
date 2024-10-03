import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  getActiveGpoCountUseCase,
  getGpoCountUseCase,
} from "@/use-cases/gpo-users";
import { getParkingSpaceCountUseCase } from "@/use-cases/parking-spaces";
import {
  BadgeCheck,
  CircleParking,
  ClipboardMinus,
  Users,
  AlertTriangle,
  LucideIcon,
} from "lucide-react";

// Define types for the renderCard function props
type CardProps = {
  title: string;
  value: string | number | null | undefined;
  icon: LucideIcon;
};

const Overview = async () => {
  let parkingSpaceCount, gpoCount, activeGpoCount;
  let error: string | null = null;

  try {
    [parkingSpaceCount, gpoCount, activeGpoCount] = await Promise.all([
      getParkingSpaceCountUseCase(),
      getGpoCountUseCase(),
      getActiveGpoCountUseCase(),
    ]);
  } catch (err) {
    console.error("Failed to fetch data:", err);
    error = "There was an error fetching the data. Please try again later.";
  }

  const renderCard = ({ title, value, icon: Icon }: CardProps) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon size={20} className="text-primary" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value ?? "N/A"}</div>
        <p className="text-xs text-muted-foreground"></p>
      </CardContent>
    </Card>
  );

  return (
    <Tabs defaultValue="overview" className="space-y-4">
      <TabsContent value="overview" className="space-y-4">
        {error ? (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {renderCard({
              title: "Parking Spaces",
              value: parkingSpaceCount,
              icon: CircleParking,
            })}
            {renderCard({
              title: "GPO Accounts",
              value: gpoCount,
              icon: Users,
            })}
            {renderCard({
              title: "Active GPO Accounts",
              value: activeGpoCount,
              icon: BadgeCheck,
            })}
            {renderCard({
              title: "Survey Responses",
              value: "Not available",
              icon: ClipboardMinus,
            })}
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
};

export default Overview;
