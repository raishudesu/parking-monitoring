import { z } from "zod";
import prisma from "../lib/db";
import { gpoAccountSchema } from "../lib/zod";
import { AccountType } from "@prisma/client";

// GPO ACCOUNT CREATION
export const createGpoAccount = async (
  data: z.infer<typeof gpoAccountSchema>
) => {
  const gpo = await prisma.gPOAccount.create({
    data: {
      ...data,
      password: data.password as string,
    },
  });

  return gpo;
};

export const getAllGpoAccounts = async ({
  skip = 0,
  take = 10,
  gpoNumberFilter = "",
  emailFilter = "",
  accountTypeFilter = undefined,
}: {
  skip?: number;
  take?: number;
  gpoNumberFilter?: string;
  emailFilter?: string;
  accountTypeFilter?: AccountType;
}) => {
  const where = {
    ...(gpoNumberFilter && {
      gatePassNumber: {
        contains: gpoNumberFilter,
      },
    }),
    ...(emailFilter && {
      email: {
        contains: emailFilter,
      },
    }),
    ...(accountTypeFilter && {
      accountType: {
        equals: accountTypeFilter,
      },
    }),
  };

  const [gpoAccounts, totalCount] = await Promise.all([
    prisma.gPOAccount.findMany({
      where,
      skip,
      take,
      include: {
        collegeName: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    }),
    prisma.gPOAccount.count({
      where,
    }),
  ]);

  return { gpoAccounts, totalCount };
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
    include: {
      collegeName: true,
    },
    omit: {
      role: true,
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

  return { ok: true, gpo };
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

export const updateGpoCreditScore = async (
  userId: string,
  creditScore: number
) => {
  await prisma.gPOAccount.update({
    where: {
      id: userId,
    },
    data: {
      creditScore,
    },
  });

  return true;
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
