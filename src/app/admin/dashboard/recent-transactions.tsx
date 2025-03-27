import React, { Fragment } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getRecentSessionsUseCase } from "@/use-cases/gpo-sessions";
import { AlertTriangle, Star } from "lucide-react";
import { GPOSession, ParkingSessionRating } from "@prisma/client";
import { parseDate } from "@/lib/utils";

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
  rating: ParkingSessionRating | null;
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
        sessions.map(
          ({ id, status, parkingSpace, accountParked, startTime, rating }) => (
            <Fragment key={id}>
              <div className="flex flex-col">
                <div className="flex items-center">
                  <div className="flex items-center">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback>
                        {parkingSpace.name.slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-bold leading-none text-primary">
                        {parkingSpace.name}
                      </p>
                      <small className="text-sm text-muted-foreground">
                        {accountParked.email}
                      </small>
                      <div
                        className={`md:hidden text-primary md:ml-auto font-semibold text-sm`}
                      >
                        {status}
                      </div>
                    </div>
                  </div>
                  <div
                    className={`hidden md:block text-primary md:ml-auto font-semibold text-sm`}
                  >
                    {status}
                  </div>
                </div>
                <div className="mt-6 flex justify-between items-center flex-wrap">
                  <small className="text-xs text-gray-500">
                    {parseDate(startTime)}
                  </small>
                  <div className="flex gap-1">
                    {rating && (
                      <>
                        {Array.from({ length: rating.rating }).map(
                          (_, index) => (
                            <Star
                              key={index}
                              fill="#fe7d55"
                              className="w-4 h-4 text-[#fe7d55]"
                            />
                          )
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
              <Separator />
            </Fragment>
          )
        )
      )}
    </div>
  );
};

export default RecentTransactions;
