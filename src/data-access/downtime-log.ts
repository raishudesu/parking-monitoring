import prisma from "@/lib/db";
import { DowntimeLog } from "@/types/downtime-log";

export const createDowntimeLog = async (data: DowntimeLog) => {
  const log = await prisma.downtimeLog.create({
    data,
  });

  return log;
};

export const getAllDowntimeLogs = async () => {
  const logs = await prisma.downtimeLog.findMany();

  return logs;
};

export const getDowntimeLogById = async (logId: string) => {
  const log = await prisma.downtimeLog.findFirst({
    where: {
      id: logId,
    },
  });

  return log;
};
