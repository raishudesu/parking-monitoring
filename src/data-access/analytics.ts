import prisma from "@/lib/db";

export const getOccupancyData = async (startDate?: Date, endDate?: Date) => {
  const gpoSessions = await prisma.gPOSession.findMany({
    where: {
      startTime: {
        gte: startDate ?? new Date(0), // default to earliest date if startDate is not provided
      },
      endTime: {
        lte: endDate ?? new Date(), // default to current date if endDate is not provided
      },
    },
    select: {
      startTime: true,
      endTime: true,
      parkingSpaceId: true,
      parkingSpace: {
        select: {
          id: true,
          name: true,
          spaceType: true,
        },
      },
    },
  });

  return gpoSessions;
};

export const getUserBehaviorData = async () => {
  const gpoAccounts = await prisma.gPOAccount.findMany({
    select: {
      accountType: true,
      _count: {
        select: {
          gpoSessions: true,
        },
      },
      gpoSessions: {
        select: {
          startTime: true,
          endTime: true,
          parkingSpace: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  return gpoAccounts;
};

export const getSpaceUtilData = async () => {
  const parkingSpaces = await prisma.parkingSpace.findMany({
    select: {
      id: true,
      name: true,
      spaceType: true,
      _count: {
        select: {
          gpoSessions: true,
        },
      },
      gpoSessions: {
        select: {
          startTime: true,
          endTime: true,
        },
      },
    },
  });

  return parkingSpaces;
};

export const getPeakHoursData = async () => {
  const sessions = await prisma.gPOSession.findMany({
    select: {
      startTime: true,
      endTime: true,
    },
  });

  return sessions;
};
