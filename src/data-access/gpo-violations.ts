import prisma from "@/lib/db";
import { GPOViolation } from "@prisma/client";

export const createGpoViolation = async (data: GPOViolation) => {
  const violation = await prisma.gPOViolation.create({
    data,
  });

  // deduct points to gpo user
  const gpo = await prisma.gPOAccount.update({
    where: {
      id: data.accountViolatorId,
    },
    data: {
      creditScore: {
        decrement: data.pointsDeducted,
      },
    },
  });

  return { GatePassOwner: gpo, Violation: violation };
};
