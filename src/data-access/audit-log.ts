import prisma from "@/lib/db";
import { auditLogSchema } from "@/lib/zod";
import { z } from "zod";

export const createAuditLog = async (data: z.infer<typeof auditLogSchema>) => {
  const log = await prisma.auditLog.create({
    data,
  });

  return log;
};

export const getAuditLogs = async () => {
  const logs = await prisma.auditLog.findMany();

  return logs;
};
