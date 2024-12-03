import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ClockIcon,
  UserIcon,
  AlertTriangleIcon,
  CheckCircleIcon,
} from "lucide-react";

interface DowntimeLog {
  id: string;
  startedAt: Date;
  endedAt: Date;
  areViolationsWaived: boolean;
  adminId: string;
}

interface DowntimeLogCardProps {
  downtimeLog: DowntimeLog | null;
}

export function DowntimeLogCard({ downtimeLog }: DowntimeLogCardProps) {
  if (!downtimeLog) {
    return (
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">
            No downtime log available
          </p>
        </CardContent>
      </Card>
    );
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    }).format(date);
  };

  const duration = Math.round(
    (downtimeLog.endedAt.getTime() - downtimeLog.startedAt.getTime()) / 60000
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Downtime Log
          <Badge
            variant={
              downtimeLog.areViolationsWaived ? "default" : "destructive"
            }
          >
            {downtimeLog.areViolationsWaived ? (
              <CheckCircleIcon className="mr-1 h-4 w-4" />
            ) : (
              <AlertTriangleIcon className="mr-1 h-4 w-4" />
            )}
            {downtimeLog.areViolationsWaived
              ? "Violations Waived"
              : "Violations Not Waived"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center space-x-4 rounded-md border p-4">
          <ClockIcon className="h-6 w-6 text-muted-foreground" />
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">Duration</p>
            <p className="text-sm text-muted-foreground">{duration} minutes</p>
          </div>
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <ClockIcon className="mr-2 h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Started:</span>
            <span className="ml-2 text-sm text-muted-foreground">
              {formatDate(downtimeLog.startedAt)}
            </span>
          </div>
          <div className="flex items-center">
            <ClockIcon className="mr-2 h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Ended:</span>
            <span className="ml-2 text-sm text-muted-foreground">
              {formatDate(downtimeLog.endedAt)}
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-4 rounded-md border p-4">
          <UserIcon className="h-6 w-6 text-muted-foreground" />
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">Admin ID:</p>
            <p className="text-sm text-muted-foreground">
              {downtimeLog.adminId}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-4 rounded-md border p-4">
          <AlertTriangleIcon className="h-6 w-6 text-muted-foreground" />
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">Log ID</p>
            <p className="text-sm text-muted-foreground">{downtimeLog.id}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
