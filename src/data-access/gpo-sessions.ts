import prisma from "@/lib/db";
import { getDowntimeLogById } from "./downtime-log";
import { SessionStatus } from "@prisma/client";

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

export const createGpoSessionByPriority = async (
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
      currReservedCapacity: {
        increment: 1,
      },
    },
  });

  return gpoSession;
};

export const endGpoSessionByPriority = async (
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
      currReservedCapacity: {
        decrement: 1,
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
export const getAllGpoSessions = async ({
  skip = 0,
  take = 10,
  emailFilter = "",
  statusFilter = undefined,
}: {
  skip?: number;
  take?: number;
  emailFilter?: string;
  statusFilter?: SessionStatus;
}) => {
  const where = {
    ...(emailFilter && {
      accountParked: {
        email: {
          contains: emailFilter,
        },
      },
    }),
    ...(statusFilter && {
      status: {
        equals: statusFilter,
      },
    }),
  };

  const [sessions, totalCount] = await Promise.all([
    prisma.gPOSession.findMany({
      where,
      skip,
      take,
      include: {
        parkingSpace: true,
        accountParked: {
          omit: {
            password: true,
          },
        },
        rating: true,
      },
      orderBy: {
        startTime: "desc",
      },
    }),
    prisma.gPOSession.count({
      where,
    }),
  ]);

  return { sessions, totalCount };
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
      rating: true,
    },
    orderBy: {
      startTime: "desc",
    },
  });

  return gpoSessions;
};

export const getGpoSessionsData = async (accountId: string) => {
  const sessions = await prisma.gPOSession.findMany({
    where: {
      accountId,
    },
    select: {
      parkingSpace: {
        select: {
          name: true,
        },
      },
      startTime: true,
    },
  });

  return sessions;
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
      rating: true,
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

export const getAffectedSessionsByDowntime = async ({
  downTimeLogId,
  skip = 0,
  take = 10,
  emailFilter = "",
  statusFilter = undefined,
}: {
  downTimeLogId: string;
  skip?: number;
  take?: number;
  emailFilter?: string;
  statusFilter?: SessionStatus;
}) => {
  const downtimeLog = await getDowntimeLogById(downTimeLogId);

  if (!downtimeLog) {
    throw new Error("Downtime log not found");
  }

  const where = {
    ...(emailFilter && {
      accountParked: {
        email: {
          contains: emailFilter,
        },
      },
    }),
    ...(statusFilter && {
      status: {
        equals: statusFilter,
      },
    }),
    shouldEndAt: {
      gte: downtimeLog.startedAt,
      lte: downtimeLog.endedAt,
    },
    endTime: {
      gt: downtimeLog.endedAt, // Session was ended after the downtime
    },
  };

  // Find sessions that should have ended during the downtime but were ended after the downtime
  const [affectedSessions, totalCount] = await Promise.all([
    prisma.gPOSession.findMany({
      where,
      skip,
      take,
      include: {
        parkingSpace: true,
        accountParked: {
          omit: {
            password: true,
          },
        },
        rating: true,
      },
      orderBy: {
        startTime: "desc",
      },
    }),
    prisma.gPOSession.count({
      where,
    }),
  ]);

  return { affectedSessions, totalCount };
};
