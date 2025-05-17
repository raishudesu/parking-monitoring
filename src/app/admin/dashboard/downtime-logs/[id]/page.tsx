import { getAffectedSessionsByDowntimeUseCase } from "@/use-cases/gpo-violations";
import { getDowntimeLogByIdUseCase } from "@/use-cases/downtime-log";
import { DowntimeLogCard } from "./downtime-log-card";
import { SessionsTable } from "../../sessions/sessions-table";
import WaiveCreditDeductionsBtn from "./waive-credit-deductions-btn";
import { Suspense } from "react";
import LoadingTable from "@/components/loading-table";
import { SessionStatus } from "@prisma/client";

const SessionsTableWithData = async ({
  searchParams,
}: {
  searchParams: Promise<{
    id: string;
    page?: string;
    email?: string;
    status?: SessionStatus;
  }>;
}) => {
  const awaitedParams = await searchParams;
  const currentPage = Number(awaitedParams.page) || 1;
  const pageSize = 10;
  const emailFilter = awaitedParams.email || "";
  const statusFilter = awaitedParams.status || undefined;

  const [downtimeLog, affectedSessions] = await Promise.all([
    getDowntimeLogByIdUseCase(awaitedParams.id),
    getAffectedSessionsByDowntimeUseCase({
      downTimeLogId: awaitedParams.id,
      page: currentPage,
      limit: pageSize,
      emailFilter,
      statusFilter,
    }),
  ]);

  const accountIds = affectedSessions.data
    .filter((session) => session.accountParked) // Ensure session has an accountParked object
    .map((session) => session.accountParked.id); // Extract the id from accountParked

  return (
    <>
      <DowntimeLogCard downtimeLog={downtimeLog} />
      <div className="mt-6 flex justify-between flex-wrap items-center">
        <div>
          <h2 className="text-muted-foreground scroll-m-20 text-xl tracking-tight lg:text-2xl">
            Affected Sessions
          </h2>
          <small className="text-xs text-muted-foreground">
            These sessions are those that were ended by the users after the
            downtime, resulting in violations because they could not end the
            session on time during the downtime.
          </small>
        </div>
        {downtimeLog?.areViolationsWaived ? null : (
          <WaiveCreditDeductionsBtn
            logId={awaitedParams.id}
            accountIds={accountIds}
          />
        )}
      </div>
      <SessionsTable
        data={affectedSessions.data}
        totalCount={affectedSessions.totalCount}
        pageCount={affectedSessions.pageCount}
        currentPage={currentPage}
      />
    </>
  );
};

const DowntimeLogPage = async ({
  searchParams,
}: {
  searchParams: Promise<{
    id: string;
    page?: string;
    email?: string;
    status?: SessionStatus;
  }>;
}) => {
  return (
    <div className="w-full flex flex-col p-6">
      <div className="pb-6 flex flex-col gap-3">
        <div className="text-lg text-muted-foreground">
          Administrator Dashboard
        </div>
        <h1 className="text-primary scroll-m-20 text-4xl tracking-tight lg:text-5xl">
          Downtime Log
        </h1>
      </div>

      <Suspense fallback={<LoadingTable />}>
        <SessionsTableWithData searchParams={searchParams} />
      </Suspense>
    </div>
  );
};

export default DowntimeLogPage;
