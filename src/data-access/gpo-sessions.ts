import prisma from "@/lib/db";

// GPO SESSION CREATION
export const createGpoSession = async (
  parkingSpaceId: string,
  gpoAccountId: string
) => {
  const gpoSession = await prisma.gPOSession.create({
    data: {
      accountId: gpoAccountId,
      parkingSpaceId,
    },
  });

  return gpoSession;
};

// GET CURRENT GPO'S SESSION
export const getCurrentGpoSession = async (accountId: string) => {
  const currentGpoSession = await prisma.gPOSession.findFirst({
    where: {
      accountId,
    },
    orderBy: {
      startTime: "desc",
    },
  });

  return currentGpoSession;
};

// GETTING ALL GPO SESSIONS
export const getAllGpoSessions = async () => {
  const allGpoSessions = await prisma.gPOSession.findMany();

  return allGpoSessions;
};

// GET ALL SESSIONS OF A GPO
export const getGpoSessionsById = async (accountId: string) => {
  const gpoSessions = await prisma.gPOSession.findMany({
    where: {
      accountId,
    },
  });

  return gpoSessions;
};

// ENDING A GPO SESSION
export const endGpoSession = async (
  accountId: string,
  endedProperly: boolean
) => {
  // GET THE LATEST GPO SESSION FIRST
  const lastGpoSession = await getCurrentGpoSession(accountId);

  if (!lastGpoSession)
    throw Error(`No GPO Session found for accountId: ${accountId}`);

  // CHECK IF THE LATEST SESSION ALREADY ENDED
  if (lastGpoSession?.status === "ENDED")
    throw Error("Last GPO Session has ended.");

  // UPDATE GPO SESSION'S END TIME, STATUS, AND IF ENDED PROPERLY
  const gpoSession = await prisma.gPOSession.update({
    where: {
      id: lastGpoSession?.id,
    },
    data: {
      endTime: new Date(),
      status: "ENDED",
      endedProperly,
    },
  });

  return gpoSession;
};
