import prisma from "@/lib/db";

// LIMITED TO ONE PARKING SESSION
// GPO SESSION CREATION
export const createGpoSession = async (
  parkingSpaceId: string,
  gpoAccountId: string,
  shouldEndAt: Date
) => {
  const gpoSession = await prisma.gPOSession.create({
    data: {
      accountId: gpoAccountId,
      parkingSpaceId,
      shouldEndAt,
    },
  });

  await prisma.parkingSpace.update({
    where: {
      id: parkingSpaceId,
    },
    data: {
      currCapacity: {
        increment: 1,
      },
    },
  });

  return gpoSession;
};

// GET CURRENT/ONGOING GPO'S SESSION
export const getOngoingGpoSession = async (accountId: string) => {
  const currentGpoSession = await prisma.gPOSession.findFirst({
    where: {
      accountId,
      status: "ONGOING",
    },
    include: {
      parkingSpace: true,
    },
    orderBy: {
      startTime: "desc",
    },
  });

  // console.log(currentGpoSession);

  return currentGpoSession;
};

// GETTING ALL GPO SESSIONS
export const getAllGpoSessions = async () => {
  const allGpoSessions = await prisma.gPOSession.findMany({
    include: {
      parkingSpace: true,
      accountParked: {
        omit: {
          password: true,
        },
      },
    },
    orderBy: {
      startTime: "desc",
    },
  });

  return allGpoSessions;
};

// GET ALL SESSIONS OF A GPO
export const getGpoSessionsByGpoId = async (accountId: string) => {
  const gpoSessions = await prisma.gPOSession.findMany({
    where: {
      accountId,
    },
    take: 10,
    include: {
      parkingSpace: true,
    },
    orderBy: {
      startTime: "desc",
    },
  });

  return gpoSessions;
};

// ENDING A GPO SESSION
export const endGpoSession = async (
  gpoSessionId: string,
  endedProperly: boolean
) => {
  // UPDATE GPO SESSION'S END TIME, STATUS, AND IF ENDED PROPERLY
  const gpoSession = await prisma.gPOSession.update({
    where: {
      id: gpoSessionId,
    },
    data: {
      endTime: new Date(),
      status: "ENDED",
      endedProperly,
    },
  });

  await prisma.parkingSpace.update({
    where: {
      id: gpoSession.parkingSpaceId,
    },
    data: {
      currCapacity: {
        decrement: 1,
      },
    },
  });

  return gpoSession;
};

export const getRecentSessions = async () => {
  const sessions = await prisma.gPOSession.findMany({
    take: 10,
    orderBy: {
      startTime: "desc",
    },
    include: {
      accountParked: {
        select: {
          gatePassNumber: true,
          email: true,
        },
      },
      parkingSpace: {
        select: {
          name: true,
        },
      },
    },
  });

  return sessions;
};

export const getSessionsForAnalysis = async () => {
  const sessions = await prisma.gPOSession.findMany({
    where: {
      status: "ENDED",
    },
    select: {
      id: true,
      startTime: true,
      endTime: true,
      parkingSpace: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      startTime: "asc",
    },
  });

  return sessions;
};

// This function retrieves sessions ending in the next specified number of minutes (e.g., 30).
export const getEndingSessions = async (minutesBeforeEnd = 30) => {
  const now = new Date();
  const endWindow = new Date(now.getTime() + minutesBeforeEnd * 60 * 1000); // 30 minutes from now

  const endingSessions = await prisma.gPOSession.findMany({
    where: {
      shouldEndAt: {
        gte: now, // Sessions that are currently active
        lte: endWindow, // Sessions that will end within the next 30 minutes
      },
    },
    include: {
      accountParked: {
        select: {
          email: true, // Assuming you have a user email field for notifications
        },
      },
    },
  });

  return endingSessions;
};
