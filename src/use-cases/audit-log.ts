import { getAuditLogs } from "@/data-access/audit-log";

export const getAuditLogsUseCase = async () => {
  const logs = await getAuditLogs();

  return logs;
};
