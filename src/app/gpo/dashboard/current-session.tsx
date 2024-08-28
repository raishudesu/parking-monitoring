import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { authOptions } from "@/lib/auth";
import { getCurrentGpoSessionUseCase } from "@/use-cases/gpo-users";
import { getServerSession } from "next-auth";
import EndSessionBtn from "./end-session-btn";
import ToScanBtn from "./to-scan-btn";

const CurrentSession = async () => {
  const serverSession = await getServerSession(authOptions);
  const currentParkingSession = await getCurrentGpoSessionUseCase(
    serverSession?.user.id as string
  );

  const currentParkingSpace = currentParkingSession?.parkingSpace;

  if (!currentParkingSpace) {
    return (
      <Card>
        <CardHeader className="">
          <CardTitle className="text-2xl font-medium">
            No current parking session.
          </CardTitle>
          <CardDescription>
            Start a parking session by going to Scan page.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full mt-6 flex flex-col">
            <ToScanBtn />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="">
        <CardTitle className="text-4xl font-medium">
          {currentParkingSpace?.name}
        </CardTitle>
        <CardDescription>{currentParkingSpace?.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full mt-6 flex flex-col">
          <EndSessionBtn gpoAccountId={serverSession?.user.id as string} />
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrentSession;
