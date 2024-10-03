import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getSessionsForAnalysisUseCase } from "@/use-cases/gpo-sessions";
import Overview from "./overview";
import AnalyticsSection from "./analytics";
import RecentTransactions from "./recent-transactions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

const AdminDashboardPage = async () => {
  let session;
  let parkingUsageData;
  let sessionError = null;
  let dataError = null;

  try {
    session = await getServerSession(authOptions);
  } catch (error) {
    console.error("Failed to get server session:", error);
    sessionError =
      "There was an error authenticating your session. Please try logging in again.";
  }

  if (!sessionError) {
    try {
      parkingUsageData = await getSessionsForAnalysisUseCase();
    } catch (error) {
      console.error("Failed to fetch parking usage data:", error);
      dataError =
        "There was an error fetching the parking usage data. Some dashboard features may be unavailable.";
    }
  }

  const renderErrorAlert = (error: any) => (
    <Alert variant="destructive">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>{error}</AlertDescription>
    </Alert>
  );

  if (sessionError) {
    return renderErrorAlert(sessionError);
  }

  return (
    <div className="w-full flex flex-col p-6">
      <div className="pb-6 flex flex-col gap-3">
        <div className="text-lg text-muted-foreground">
          Administrator Dashboard
        </div>
        <h1 className="scroll-m-20 text-4xl tracking-tight lg:text-5xl">
          Hi, {session?.user.firstName}! 👨‍💻
        </h1>
      </div>
      {dataError && renderErrorAlert(dataError)}
      <Overview />
      <div className="w-full mt-6 ">
        <div className="w-full h-full flex flex-col xl:grid xl:grid-cols-2 gap-4 ">
          <AnalyticsSection parkingUsageData={parkingUsageData} />
          <div className="max-h-[65vh] bg-background shadow-md p-6 border rounded-lg overflow-y-scroll flex flex-col gap-6">
            <span className="text-lg font-semibold">Recent Sessions</span>
            <RecentTransactions />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
