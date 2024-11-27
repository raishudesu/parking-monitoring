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
import { getSurveyCountUseCase } from "@/use-cases/user-survey";

type CardProps = {
  title: string;
  value: string | number | null | undefined;
  icon: LucideIcon;
  error?: string | null;
};

const Overview = async () => {
  const results = await Promise.allSettled([
    getParkingSpaceCountUseCase(),
    getGpoCountUseCase(),
    getActiveGpoCountUseCase(),
    getSurveyCountUseCase(),
  ]);

  const [
    parkingSpaceResult,
    gpoCountResult,
    activeGpoCountResult,
    surveyCount,
  ] = results;

  const renderCard = ({ title, value, icon: Icon, error }: CardProps) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon size={20} className="text-primary" />
      </CardHeader>
      <CardContent>
        {error ? (
          <Alert variant="destructive" className="mt-2">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : (
          <>
            <div className="text-2xl font-bold">{value ?? "N/A"}</div>
            <p className="text-xs text-muted-foreground"></p>
          </>
        )}
      </CardContent>
    </Card>
  );

  return (
    <Tabs defaultValue="overview" className="space-y-4">
      <TabsContent value="overview" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {renderCard({
            title: "Parking Spaces",
            value:
              parkingSpaceResult.status === "fulfilled"
                ? parkingSpaceResult.value
                : undefined,
            icon: CircleParking,
            error:
              parkingSpaceResult.status === "rejected"
                ? parkingSpaceResult.reason.message
                : null,
          })}
          {renderCard({
            title: "GPO Accounts",
            value:
              gpoCountResult.status === "fulfilled"
                ? gpoCountResult.value
                : undefined,
            icon: Users,
            error:
              gpoCountResult.status === "rejected"
                ? gpoCountResult.reason.message
                : null,
          })}
          {renderCard({
            title: "Active GPO Accounts",
            value:
              activeGpoCountResult.status === "fulfilled"
                ? activeGpoCountResult.value
                : undefined,
            icon: BadgeCheck,
            error:
              activeGpoCountResult.status === "rejected"
                ? activeGpoCountResult.reason.message
                : null,
          })}
          {renderCard({
            title: "Survey Submissions",
            value:
              surveyCount.status === "fulfilled"
                ? surveyCount.value
                : "Not Available",
            icon: ClipboardMinus,
          })}
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default Overview;
