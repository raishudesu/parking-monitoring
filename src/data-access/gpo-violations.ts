import prisma from "@/lib/db";

export const createGpoViolation = async (
  accountId: string,
  violationType: string,
  pointsDeducted: number
) => {
  const violation = await prisma.gPOViolation.create({
    data: {
      accountViolatorId: accountId,
      violationType,
      pointsDeducted,
    },
  });

  // deduct points to gpo user
  const gpo = await prisma.gPOAccount.update({
    where: {
      id: accountId,
    },
    data: {
      creditScore: {
        decrement: pointsDeducted,
      },
    },
  });

  return { GatePassOwner: gpo, Violation: violation };
};

export const getAllGpoViolations = async () => {
  const violations = await prisma.gPOViolation.findMany({
    include: {
      accountViolator: {
        select: {
          email: true,
        },
      },
    },
  });

  return violations;
};
