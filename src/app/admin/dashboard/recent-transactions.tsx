import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { getRecentSessionsUseCase } from "@/use-cases/gpo-sessions";
import { Fragment } from "react";

const RecentTransactions = async () => {
  const sessions = await getRecentSessionsUseCase();
  return (
    <div className="space-y-6">
      {sessions.map(({ id, status, parkingSpace, accountParked }) => (
        <Fragment key={id}>
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
        </Fragment>
      ))}
    </div>
  );
};

export default RecentTransactions;
