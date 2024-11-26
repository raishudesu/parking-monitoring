import { getAuditLogsUseCase } from "@/use-cases/audit-log";
import { AdminLogsTable, AuditLogsData } from "./admin-logs-table";
import { Admin, AuditLog } from "@prisma/client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

const AuditLogsPage = async () => {
  let logs: AuditLogsData[] | null = null;
  let error: string | null = null;

  try {
    const fetchedAuditLogs = await getAuditLogsUseCase();

    logs = fetchedAuditLogs as AuditLogsData[];
  } catch (err) {
    console.error("Error fetching data:", err);
    error =
      " There was an error fetching the audit logs data. Please try again later.";
  }

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
      {error ? (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : logs ? (
        <AdminLogsTable data={logs} />
      ) : (
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>No Data</AlertTitle>
          <AlertDescription>
            No audit logs data available at the moment.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default AuditLogsPage;
