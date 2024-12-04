import prisma from "@/lib/db";
import { auditLogSchema } from "@/lib/zod";
import { z } from "zod";

export const createAdminLog = async (data: z.infer<typeof auditLogSchema>) => {
  const log = await prisma.adminLog.create({
    data,
  });

  return log;
};

export const getAdminLogs = async () => {
  const logs = await prisma.adminLog.findMany({
    include: {
      admin: {
        select: {
          firstName: true,
          lastName: true,
          corpEmail: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return logs;
};
