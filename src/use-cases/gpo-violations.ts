import { createGpoViolation } from "@/data-access/gpo-violations";

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
