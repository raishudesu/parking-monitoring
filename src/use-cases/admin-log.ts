import { getAuditLogs } from "@/data-access/admin-log";

export const getAuditLogsUseCase = async () => {
  const logs = await getAuditLogs();

  return logs;
};
