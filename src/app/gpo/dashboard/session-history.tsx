import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { authOptions } from "@/lib/auth";
import { getGpoSessionsByIdUseCase } from "@/use-cases/gpo-sessions";
import { getServerSession } from "next-auth";
import { Fragment } from "react";
import { parseDate } from "@/lib/utils";

const SessionHistory = async () => {
  const session = await getServerSession(authOptions);
  const sessionHistory = await getGpoSessionsByIdUseCase(
    session?.user.id as string
  );

  return (
    <div className="max-h-80 space-y-6">
      {sessionHistory.map(({ status, parkingSpace, startTime }, index) => (
        <Fragment key={index}>
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
                </div>
              </div>
              <div
                className={`text-primary ml-auto md:mt-0 md:ml-auto font-semibold text-sm`}
              >
                {status}
              </div>
            </div>
            <div className="mt-6">
              <small className="text-xs text-gray-500">
                {parseDate(startTime)}
              </small>
            </div>
          </div>
          <Separator />
        </Fragment>
      ))}
    </div>
  );
};

export default SessionHistory;
