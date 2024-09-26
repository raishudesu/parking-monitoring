import React from "react";
import Overview from "./overview";
import AnalyticsSection from "./analytics";
import RecentTransactions from "./recent-transactions";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getSessionsForAnalysisUseCase } from "@/use-cases/gpo-sessions";

const AdminDashboardPage = async () => {
  const session = await getServerSession(authOptions);
  const parkingUsageData = await getSessionsForAnalysisUseCase();

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
      <Overview />
      <div className=" mt-6 ">
        <div className="h-full grid xl:grid-cols-2 gap-4 ">
          <AnalyticsSection parkingUsageData={parkingUsageData} />
          <div className=" bg-background shadow-md p-6 border rounded-lg overflow-y-scroll flex flex-col gap-6">
            <span className="text-lg font-semibold">Recent Sessions</span>
            <RecentTransactions />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
