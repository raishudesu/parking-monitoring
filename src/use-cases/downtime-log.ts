import {
  createDowntimeLog,
  getAllDowntimeLogs,
  getDowntimeLogById,
} from "@/data-access/downtime-log";
import { DowntimeLog } from "@/types/downtime-log";

export const createDowntimeLogUseCase = async (data: DowntimeLog) => {
  const log = await createDowntimeLog(data);

  return log;
};

export const getAllDowntimeLogsUseCase = async () => {
  const logs = await getAllDowntimeLogs();

  return logs;
};

export const getDowntimeLogByIdUseCase = async (logId: string) => {
  const log = await getDowntimeLogById(logId);

  return log;
};
