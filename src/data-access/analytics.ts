import prisma from "@/lib/db";

export const getOccupancyDataForAnalysis = async (
  startDate?: Date,
  endDate?: Date
) => {
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
