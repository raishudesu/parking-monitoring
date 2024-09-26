import { getAuditLogsUseCase } from "@/use-cases/audit-log";
import { AuditLogsTable } from "./audit-logs-table";

const AuditLogsPage = async () => {
  const logs = await getAuditLogsUseCase();

  return (
    <div className="w-full flex flex-col p-6">
      <div className="pb-6 flex flex-col gap-3">
        <div className="text-lg text-muted-foreground">
          Administrator Dashboard
        </div>
        <h1 className="scroll-m-20 text-4xl tracking-tight lg:text-5xl">
          Audit Logs
        </h1>
      </div>
      <div className="mt-6">
        <AuditLogsTable data={logs} />
      </div>
    </div>
  );
};

export default AuditLogsPage;
