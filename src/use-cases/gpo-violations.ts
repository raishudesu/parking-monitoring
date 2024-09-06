import { createGpoViolation } from "@/data-access/gpo-violations";
import { GPOViolation } from "@prisma/client";

export const createGpoViolationUseCase = async (data: GPOViolation) => {
  const violation = await createGpoViolation(data);

  return violation;
};
