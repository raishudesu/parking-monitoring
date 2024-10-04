import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getRecentSessionsUseCase } from "@/use-cases/gpo-sessions";
import { AlertTriangle } from "lucide-react";
import { GPOSession } from "@prisma/client";

// Define types for the session data
type Session = GPOSession & {
  id: string;
  status: string;
  parkingSpace: {
    name: string;
  };
  accountParked: {
    email: string | null;
    gatePassNumber: string;
  };
};

const RecentTransactions = async () => {
  let sessions: Session[] = [];
  let error: string | null = null;

  try {
    const fetchedSessions = await getRecentSessionsUseCase();
    sessions = fetchedSessions as Session[];
  } catch (err) {
    console.error("Failed to fetch recent sessions:", err);
    error =
      "There was an error fetching recent transactions. Please try again later.";
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      {sessions.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No recent transactions available.
        </p>
      ) : (
        sessions.map(({ id, status, parkingSpace, accountParked }) => (
          <React.Fragment key={id}>
            <div className="flex flex-col md:flex-row md:items-center">
              <div className="flex items-center">
                <Avatar className="h-9 w-9">
                  <AvatarFallback>{parkingSpace.name}</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-bold leading-none text-primary">
                    {parkingSpace.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {accountParked.email}
                  </p>
                </div>
              </div>
              <div
                className={`text-primary ml-12 mt-3 md:mt-0 md:ml-auto font-semibold text-sm`}
              >
                {accountParked.gatePassNumber} ({status})
              </div>
            </div>
            <Separator />
          </React.Fragment>
        ))
      )}
    </div>
  );
};

export default RecentTransactions;
