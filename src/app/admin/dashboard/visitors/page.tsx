import React from "react";
import { VisitorSessionsTable } from "./visitor-sessions-table";
import {
  getAllVisitorCardsUseCase,
  getAllVisitorSessionUseCase,
} from "@/use-cases/visitors";
import { VisitorCardsTable } from "./visitor-cards-table";
import ScanQrDrawer from "./scan-qr-drawer";
import { SessionDurationLineChart } from "./session-duration-line-chart";
import { getVisitorPeakHoursDataUseCase } from "@/use-cases/analytics";
import PeakHoursChart from "../analytics/peak-hours-chart";

const VisitorsPage = async () => {
  const [visitorSessions, visitorCards, visitorPeakData] = await Promise.all([
    getAllVisitorSessionUseCase(),
    getAllVisitorCardsUseCase(),
    getVisitorPeakHoursDataUseCase(),
  ]);

  return (
    <div className="w-full flex flex-col p-6">
      <div className="pb-6 flex flex-col gap-3">
        <div className="text-lg text-muted-foreground">
          Administrator Dashboard
        </div>
        <h1 className="text-primary scroll-m-20 text-4xl tracking-tight lg:text-5xl">
          Visitors
        </h1>
      </div>
      <div className="pb-6">
        <ScanQrDrawer />
      </div>
      <div className="pb-6 text-xl">
        VISITORS INSIDE:{" "}
        {
          visitorSessions.filter((session) => session.status === "ONGOING")
            .length
        }
      </div>
      <p className="text-muted-foreground scroll-m-20 text-xl tracking-tight lg:text-2xl">
        Visitor Pass Cards
      </p>
      <VisitorCardsTable data={visitorCards} />
      <p className="text-muted-foreground scroll-m-20 text-xl tracking-tight lg:text-2xl">
        Visitor Sessions
      </p>
      <VisitorSessionsTable data={visitorSessions} />
      <p className="text-muted-foreground scroll-m-20 text-xl tracking-tight lg:text-2xl">
        Analytics
      </p>
      <div className="py-6 grid md:grid-cols-2 gap-6">
        <PeakHoursChart data={visitorPeakData} />
        <SessionDurationLineChart data={visitorSessions} />
      </div>
    </div>
  );
};

export default VisitorsPage;
