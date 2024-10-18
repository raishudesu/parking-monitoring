import {
  getOccupancyData,
  getPeakHoursData,
  getSpaceUtilData,
  getUserBehaviorData,
} from "@/data-access/analytics";
import {
  AggregationMap,
  ParkingSpace,
  ProcessedBehaviorData,
  UtilizationData,
} from "@/types/analytics";

export const getOccupancyDataUseCase = async (
  startDate?: Date,
  endDate?: Date
) => {
  const gpoSessions = await getOccupancyData(startDate, endDate);

  return gpoSessions;
};

export const getUserBehaviorDataUseCase = async () => {
  const data = await getUserBehaviorData();

  const processedData = data.map((account) => {
    const totalDuration = account.gpoSessions.reduce((acc, session) => {
      const start = new Date(session.startTime).getTime();
      const end = new Date(session.endTime ?? 0).getTime();
      return acc + (end - start); // Duration in milliseconds
    }, 0);

    const averageDuration = totalDuration / account._count.gpoSessions; // Calculate average duration in milliseconds

    return {
      accountType: account.accountType,
      sessionCount: account._count.gpoSessions,
      averageDuration: averageDuration / (1000 * 60), // Convert to minutes
    };
  });

  // Execute aggregation
  const aggregatedData = aggregateUserBehaviorData(processedData);

  // Convert to desired output format
  const result = Object.entries(aggregatedData).map(
    ([accountType, { totalSessions, averageDuration }]) => ({
      accountType,
      totalSessions,
      averageDuration,
    })
  );

  return result;
};

const aggregateUserBehaviorData = (data: ProcessedBehaviorData[]) => {
  const aggregation: AggregationMap = {};

  data.forEach(({ accountType, sessionCount, averageDuration }) => {
    // Initialize if the accountType is not already present
    if (!aggregation[accountType]) {
      aggregation[accountType] = {
        totalSessions: 0,
        totalDuration: 0,
        sessionCount: 0,
      };
    }

    // Aggregate session count and duration
    aggregation[accountType].totalSessions += sessionCount;
    if (!isNaN(averageDuration)) {
      aggregation[accountType].totalDuration += averageDuration * sessionCount; // duration contributes to the total based on session count
      aggregation[accountType].sessionCount += sessionCount; // count valid sessions
    }
  });

  // Calculate average durations for each account type
  Object.keys(aggregation).forEach((accountType) => {
    const { totalSessions, totalDuration, sessionCount } =
      aggregation[accountType];
    aggregation[accountType].averageDuration =
      sessionCount > 0 ? totalDuration / sessionCount : 0; // avoid division by zero
  });

  return aggregation;
};

export const getSpaceUtilDataUseCase = async (): Promise<UtilizationData> => {
  const data = await getSpaceUtilData();

  const utilizationData: UtilizationData = {};

  data.forEach((space: ParkingSpace) => {
    const totalDuration = space.gpoSessions.reduce((acc, session) => {
      const start = new Date(session.startTime).getTime();
      const end = new Date(session.endTime ?? 0).getTime();
      return acc + (end - start);
    }, 0);

    const sessionCount = space.gpoSessions.length;
    const averageDuration = sessionCount > 0 ? totalDuration / sessionCount : 0;

    // Initialize the space type if not already present
    if (!utilizationData[space.spaceType]) {
      utilizationData[space.spaceType] = {
        totalSessions: 0,
        totalDuration: 0,
        sessionCount: 0,
      };
    }

    // Aggregate data
    utilizationData[space.spaceType].totalSessions += sessionCount;
    utilizationData[space.spaceType].totalDuration += totalDuration;
    utilizationData[space.spaceType].sessionCount += sessionCount;
    // utilizationData[space.spaceType].averageDuration += averageDuration;
  });

  // Calculate average durations
  Object.keys(utilizationData).forEach((spaceType) => {
    const { totalDuration, sessionCount } = utilizationData[spaceType];
    utilizationData[spaceType].averageDuration =
      sessionCount > 0 ? totalDuration / (sessionCount * 1000 * 60 * 60) : 0; // Convert to hours
  });

  return utilizationData;
};

// Define types
interface PeakHoursData {
  hourCounts: number[]; // Array to store counts for each hour (0-23)
  dayCounts: number[]; // Array to store counts for each day (0: Sunday, 1: Monday, ..., 6: Saturday)
}

// Helper to initialize empty data
const initializePeakHoursData = (): PeakHoursData => ({
  hourCounts: Array(24).fill(0), // Initialize 24 hours with 0 counts
  dayCounts: Array(7).fill(0), // Initialize 7 days (Sunday-Saturday) with 0 counts
});

export const getPeakHoursDataUseCase = async () => {
  const sessions = await getPeakHoursData();
  const peakData = initializePeakHoursData();

  sessions.forEach((session) => {
    const date = new Date(session.startTime);
    const hour = date.getHours(); // Get hour (0-23)
    const day = date.getDay(); // Get day of the week (0: Sunday, 1: Monday, ..., 6: Saturday)

    peakData.hourCounts[hour] += 1; // Increment hour count
    peakData.dayCounts[day] += 1; // Increment day count
  });

  return peakData;
};
