import LoadingTable from "@/components/loading-table";
import { AdminLogsTable, AdminLogsData } from "./admin-logs-table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getAdminLogsUseCase } from "@/use-cases/admin-log";
import { AdminAction } from "@prisma/client";
import { AlertTriangle } from "lucide-react";
import { Suspense } from "react";

const AdminLogsTableWithData = async ({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    actionType?: AdminAction | undefined;
  }>;
}) => {
  const awaitedParams = await searchParams;
  const currentPage = Number(awaitedParams.page) || 1;
  const pageSize = 10;
  const actionFilter = awaitedParams.actionType || undefined;

  const { data, totalCount, pageCount } = await getAdminLogsUseCase({
    page: currentPage,
    limit: pageSize,
    actionFilter,
  });

  return (
    <AdminLogsTable
      data={data}
      totalCount={totalCount}
      pageCount={pageCount}
      currentPage={currentPage}
    />
  );
};

const AuditLogsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    adminType?: AdminAction;
  }>;
}) => {
  return (
    <div className="w-full flex flex-col p-6">
      <div className="pb-6 flex flex-col gap-3">
        <div className="text-lg text-muted-foreground">
          Administrator Dashboard
        </div>
        <h1 className="text-primary scroll-m-20 text-4xl tracking-tight lg:text-5xl">
          Admin Logs
        </h1>
      </div>
      <Suspense fallback={<LoadingTable />}>
        <AdminLogsTableWithData searchParams={searchParams} />
      </Suspense>
    </div>
  );
};

export default AuditLogsPage;
