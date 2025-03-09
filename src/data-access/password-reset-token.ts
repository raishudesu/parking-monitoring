import prisma from "@/lib/db";
import { TPasswordResetToken } from "@/types/password-reset-token";

export const createPasswordResetToken = async (data: TPasswordResetToken) => {
  const token = await prisma.passwordResetToken.create({
    data,
  });

  return token;
};

export const findPasswordResetToken = async (token: string) => {
  const foundToken = prisma.passwordResetToken.findUnique({
    where: {
      token,
      expiresAt: { gt: new Date() },
      isUsed: false,
    },
  });

  return foundToken;
};

export const invalidatePasswordResetToken = async (token: string) => {
  await prisma.passwordResetToken.update({
    where: {
      token,
    },
    data: {
      isUsed: true,
    },
  });

  return { ok: true };
};
