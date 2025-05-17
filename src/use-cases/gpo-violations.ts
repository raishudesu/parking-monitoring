import { getAffectedSessionsByDowntime } from "@/data-access/gpo-sessions";
import {
  createGpoViolation,
  getAllGpoViolations,
  restoreCreditScoresByDowntime,
} from "@/data-access/gpo-violations";
import { SessionStatus } from "@prisma/client";

export const createGpoViolationUseCase = async (
  accountId: string,
  violationType: string,
  pointsDeducted: number
) => {
  const violation = await createGpoViolation(
    accountId,
    violationType,
    pointsDeducted
  );

  return violation;
};

export const getAllGpoViolationsUseCase = async () => {
  const violations = await getAllGpoViolations();

  return violations;
};

export const restoreCreditScoresByDowntimeUseCase = async (
  logId: string,
  accountIds: string[]
) => {
  const resolved = await restoreCreditScoresByDowntime(logId, accountIds);

  return resolved;
};

export const getAffectedSessionsByDowntimeUseCase = async ({
  downTimeLogId,
  page = 1,
  limit = 10,
  emailFilter = "",
  statusFilter = undefined,
}: {
  downTimeLogId: string;
  page?: number;
  limit?: number;
  emailFilter?: string;
  statusFilter?: SessionStatus;
}) => {
  const skip = (page - 1) * limit;

  const { affectedSessions, totalCount } = await getAffectedSessionsByDowntime({
    downTimeLogId,
    skip,
    take: limit,
    emailFilter,
    statusFilter,
  });

  const pageCount = Math.ceil(totalCount / limit);

  return { data: affectedSessions, totalCount, pageCount };
};
