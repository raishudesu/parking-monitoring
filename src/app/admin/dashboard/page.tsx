import React from "react";
import Overview from "./overview";
import AnalyticsSection from "./analytics";
import RecentTransactions from "./recent-transactions";

const AdminDashboard = () => {
  return (
    <div className="w-full flex flex-col p-6">
      <div className="pb-6 flex flex-col gap-3">
        <div className="text-lg text-muted-foreground">Dashboard</div>
        <h1 className="scroll-m-20 text-4xl tracking-tight lg:text-5xl">
          Hi, Administrator! 👨‍💻
        </h1>
      </div>
      <Overview />
      <div className=" mt-6 ">
        <div className="h-full grid xl:grid-cols-2 gap-4 ">
          <div className="max-h-[65vh]">
            <AnalyticsSection />
          </div>
          <div className="max-h-[65vh] shadow-md overflow-y-scroll p-6 border rounded-lg overflow-clip flex flex-col gap-6">
            <span className="text-lg font-semibold">Recent Sessions</span>
            <RecentTransactions />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
