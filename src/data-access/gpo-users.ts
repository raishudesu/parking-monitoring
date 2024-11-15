import { z } from "zod";
import prisma from "../lib/db";
import { gpoAccountSchema } from "../lib/zod";

// GPO ACCOUNT CREATION
export const createGpoAccount = async (
  data: z.infer<typeof gpoAccountSchema>
) => {
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

//GET DETAILS OF USER ISVIP AND ISPWD
export const getUserPrioritiesById = async (gpoAccountId: string) => {
  const data = await prisma.gPOAccount.findUnique({
    where: {
      id: gpoAccountId,
    },
    select: {
      isPWD: true,
      isVIP: true,
    },
  });

  return data;
};

// GET GPO ACCOUNT BY EMAIL
export const getGpoByEmail = async (email: string) => {
  const gpo = await prisma.gPOAccount.findUnique({
    where: {
      email,
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
  accountId: string,
  data: z.infer<typeof gpoAccountSchema>
) => {
  const gpo = await prisma.gPOAccount.update({
    where: {
      id: accountId,
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

export const getGpoCount = async () => {
  const count = await prisma.gPOAccount.count();

  return count;
};

export const getActiveGpoCount = async () => {
  const count = await prisma.gPOAccount.count({
    where: {
      isActive: true,
    },
  });

  return count;
};

export const getCreditScore = async (accountId: string) => {
  const gpo = await prisma.gPOAccount.findUnique({
    where: {
      id: accountId,
    },
    select: {
      creditScore: true,
    },
  });

  return gpo;
};
