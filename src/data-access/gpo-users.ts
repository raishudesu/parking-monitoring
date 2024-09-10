import { z } from "zod";
import prisma from "../lib/db";
import { gpoAccountSchema } from "../lib/zod";

// GPO ACCOUNT CREATION
export const createGpoAccount = async (
  data: z.infer<typeof gpoAccountSchema>
) => {
  console.log(data);
  const gpo = await prisma.gPOAccount.create({
    data,
  });

  return gpo;
};

export const getAllGpoAccounts = async () => {
  const gpoAccounts = await prisma.gPOAccount.findMany({
    include: {
      collegeName: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return gpoAccounts;
};

export const getCurrentGpoSessionByGpoId = async (gpoAccountId: string) => {
  const gpo = await prisma.gPOAccount.findUnique({
    where: {
      id: gpoAccountId,
    },
    include: {
      gpoSessions: {
        where: {
          status: "ONGOING",
        },
        include: {
          parkingSpace: true,
        },
        orderBy: {
          startTime: "desc",
        },
      },
    },
  });

  const currentSession = gpo?.gpoSessions[0];

  return currentSession;
};

// GET GPO ACCOUNT BY GATE PASS NUMBER
export const getGpoByGatePassNumber = async (gatePassNumber: string) => {
  const gpo = await prisma.gPOAccount.findUnique({
    where: {
      gatePassNumber,
    },
  });

  return gpo;
};

export const getGpoById = async (accountId: string) => {
  const gpo = await prisma.gPOAccount.findUnique({
    where: {
      id: accountId,
    },
  });

  return gpo;
};

// UPDATE GPO ACCOUNT BASED FROM GATE PASS NUMBER
export const updateGpoAccount = async (
  gatePassNumber: string,
  data: z.infer<typeof gpoAccountSchema>
) => {
  const gpo = await prisma.gPOAccount.update({
    where: {
      gatePassNumber,
    },
    data,
  });

  return gpo;
};

// DEACTIVATE GPO ACCOUNT
export const deactivateGpoAccount = async (accountId: string) => {
  const gpo = await prisma.gPOAccount.update({
    where: {
      id: accountId,
    },
    data: {
      isActive: false,
    },
  });

  return gpo;
};

// REACTIVATE GPO ACCOUNT
export const reactivateGpoAccount = async (accountId: string) => {
  const gpo = await prisma.gPOAccount.update({
    where: {
      id: accountId,
    },
    data: {
      isActive: true,
    },
  });

  return gpo;
};

export const updateGpoPassword = async (
  gpoAccountId: string,
  newPassword: string
) => {
  const gpo = await prisma.gPOAccount.update({
    where: {
      id: gpoAccountId,
    },
    data: {
      password: newPassword,
    },
  });

  return gpo;
};

export const addCreditScoreToGpo = async (
  accountId: string,
  creditToAdd: number
) => {
  const gpo = await prisma.gPOAccount.update({
    where: {
      id: accountId,
    },
    data: {
      creditScore: {
        increment: creditToAdd,
      },
    },
  });

  return gpo;
};
