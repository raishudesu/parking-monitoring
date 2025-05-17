import { getAdminLogs } from "@/data-access/admin-log";
import { AdminAction } from "@prisma/client";

export const getAdminLogsUseCase = async ({
  page = 1,
  limit = 10,
  actionFilter = undefined,
}: {
  page?: number;
  limit?: number;
  actionFilter?: AdminAction;
}) => {
  const skip = (page - 1) * limit;
  const { logs, totalCount } = await getAdminLogs({
    skip,
    take: limit,
    actionFilter,
  });

  const pageCount = Math.ceil(totalCount / limit);

  return { data: logs, totalCount, pageCount };
};
