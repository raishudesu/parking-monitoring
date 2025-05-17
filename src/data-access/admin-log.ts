import prisma from "@/lib/db";
import { auditLogSchema } from "@/lib/zod";
import { AdminAction } from "@prisma/client";
import { z } from "zod";

export const createAdminLog = async (data: z.infer<typeof auditLogSchema>) => {
  const log = await prisma.adminLog.create({
    data,
  });

  return log;
};

export const getAdminLogs = async ({
  skip = 0,
  take = 10,
  actionFilter = undefined,
}: {
  skip?: number;
  take?: number;
  actionFilter?: AdminAction;
}) => {
  const where = {
    ...(actionFilter && {
      action: {
        equals: actionFilter,
      },
    }),
  };

  const [logs, totalCount] = await Promise.all([
    prisma.adminLog.findMany({
      where,
      skip,
      take,
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
    }),
    prisma.adminLog.count({
      where,
    }),
  ]);

  return { logs, totalCount };
};
