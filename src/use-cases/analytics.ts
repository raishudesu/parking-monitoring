import { getOccupancyDataForAnalysis } from "@/data-access/analytics";

export const getOccupancyDataForAnalysisUseCase = async (
  startDate?: Date,
  endDate?: Date
) => {
  const gpoSessions = await getOccupancyDataForAnalysis(startDate, endDate);

  return gpoSessions;
};
