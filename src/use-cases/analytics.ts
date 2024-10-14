import {
  getOccupancyDataForAnalysis,
  getUserBehaviorDataForAnalysis,
} from "@/data-access/analytics";
import { AggregationMap, ProcessedBehaviorData } from "@/types/analytics";

export const getOccupancyDataForAnalysisUseCase = async (
  startDate?: Date,
  endDate?: Date
) => {
  const gpoSessions = await getOccupancyDataForAnalysis(startDate, endDate);

  return gpoSessions;
};

export const getUserBehaviorDataForAnalysisUseCase = async () => {
  const data = await getUserBehaviorDataForAnalysis();

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
