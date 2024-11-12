import { getAllVisitorSession } from "@/data-access/visitors";
import React from "react";
import { VisitorSessionsTable } from "./visitor-sessions-table";

const VisitorsPage = async () => {
  const visitorSessions = await getAllVisitorSession();

  console.log(visitorSessions);
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
      <h2 className="text-muted-foreground scroll-m-20 text-xl tracking-tight lg:text-2xl">
        Visitor Sessions
      </h2>
      <VisitorSessionsTable data={visitorSessions} />
    </div>
  );
};

export default VisitorsPage;
