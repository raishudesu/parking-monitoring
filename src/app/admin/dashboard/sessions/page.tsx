import { getAllGpoSessionsUseCase } from "@/use-cases/gpo-sessions";
import { SessionsTable } from "./sessions-table";
import { SessionStatus } from "@prisma/client";
import { Suspense } from "react";
import LoadingTable from "@/components/loading-table";

const SessionsTableWithData = async ({
  searchParams,
}: {
  searchParams: Promise<{
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

  const { data, totalCount, pageCount } = await getAllGpoSessionsUseCase({
    page: currentPage,
    limit: pageSize,
    emailFilter,
    statusFilter,
  });

  return (
    <SessionsTable
      data={data}
      totalCount={totalCount}
      pageCount={pageCount}
      currentPage={currentPage}
    />
  );
};

const SessionsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    email?: string;
    lastName?: string;
    isUCFAMember?: string;
  }>;
}) => {
  return (
    <div className="w-full flex flex-col p-6">
      <div className="pb-6 flex flex-col gap-3">
        <div className="text-lg text-muted-foreground">
          Administrator Dashboard
        </div>
        <h1 className="text-primary scroll-m-20 text-4xl tracking-tight lg:text-5xl">
          Sessions
        </h1>
      </div>
      <Suspense fallback={<LoadingTable />}>
        <SessionsTableWithData searchParams={searchParams} />
      </Suspense>
    </div>
  );
};

export default SessionsPage;
