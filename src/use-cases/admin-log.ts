import { getAdminLogs } from "@/data-access/admin-log";

export const getAdminLogsUseCase = async () => {
  const logs = await getAdminLogs();

  return logs;
};
