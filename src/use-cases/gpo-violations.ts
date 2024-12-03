import { getAffectedSessionsByDowntime } from "@/data-access/gpo-sessions";
import {
  createGpoViolation,
  getAllGpoViolations,
  restoreCreditScoresByDowntime,
} from "@/data-access/gpo-violations";

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

export const getAffectedSessionsByDowntimeUseCase = async (logId: string) => {
  const affectedSessions = await getAffectedSessionsByDowntime(logId);

  return affectedSessions;
};
