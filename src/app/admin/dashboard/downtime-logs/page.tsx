import { getAllDowntimeLogsUseCase } from "@/use-cases/downtime-log";
import React from "react";
import { DowntimeLogsTable } from "./downtime-logs-table";

const DowntimeLogsPage = async () => {
  const downtimeLogs = await getAllDowntimeLogsUseCase();
  return (
    <div className="w-full flex flex-col p-6">
      <div className="pb-6 flex flex-col gap-3">
        <div className="text-lg text-muted-foreground">
          Administrator Dashboard
        </div>
        <h1 className="text-primary scroll-m-20 text-4xl tracking-tight lg:text-5xl">
          System Downtime Logs
        </h1>
      </div>
      <DowntimeLogsTable data={downtimeLogs} />
    </div>
  );
};

export default DowntimeLogsPage;
