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
import ScanQrDrawer from "./scan-qr-drawer";

const CurrentSession = async () => {
  const serverSession = await getServerSession(authOptions);

  if (!serverSession || !serverSession.user || !serverSession.user.id) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-medium">
            Authentication Error
          </CardTitle>
          <CardDescription>
            Unable to retrieve user session. Please try logging in again.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const currentParkingSession = await getCurrentGpoSessionUseCase(
    serverSession.user.id
  );

  const currentParkingSpace = currentParkingSession?.parkingSpace;

  if (!currentParkingSpace) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-medium">
            No current parking session
          </CardTitle>
          <CardDescription>
            Start a parking session by scanning the parking QR Code
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full flex flex-col">
            <ScanQrDrawer />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-medium">
          Current parking session at:{" "}
          <span className="text-primary font-bold">
            {currentParkingSpace.name}
          </span>
        </CardTitle>
        <CardDescription>{currentParkingSpace.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full flex flex-col">
          <EndSessionBtn
            gpoAccountId={serverSession.user.id}
            shouldEndAt={currentParkingSession.shouldEndAt as Date}
            parkingSpaceName={currentParkingSpace.name}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrentSession;
