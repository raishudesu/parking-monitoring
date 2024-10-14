import { getOccupancyDataForAnalysisUseCase } from "@/use-cases/analytics";
import { OccupancyChart } from "./occupancy-chart";

type TimeFrame = "daily" | "weekly" | "yearly";

type OccupancyData = {
  startTime: Date;
  endTime: Date | null;
  parkingSpaceId: string;
  parkingSpace: {
    id: string;
    name: string;
    spaceType: string;
  };
};

type ProcessedOccupancyData = {
  timeLabel: string;
  [parkingSpaceName: string]: number | string;
};

const OccupancyAnalysis = async () => {
  const gpoSessions = await getOccupancyDataForAnalysisUseCase();
  const chartData = processOccupancyData(gpoSessions, "daily");

  return <OccupancyChart chartData={chartData} />;
};

export default OccupancyAnalysis;

function processOccupancyData(
  data: OccupancyData[],
  timeFrame: TimeFrame
): ProcessedOccupancyData[] {
  let groupedData: Record<string, Record<string, number>> = {};

  data.forEach((session) => {
    const duration =
      (new Date(session.endTime ?? 0).getTime() -
        new Date(session.startTime).getTime()) /
      (1000 * 60); // in minutes

    let timeLabel: string;
    switch (timeFrame) {
      case "daily":
        timeLabel = new Date(session.startTime).toLocaleDateString(); // Group by day
        break;
      case "weekly":
        const startOfWeek = new Date(session.startTime);
        startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay()); // Start of the week (Sunday)
        timeLabel = startOfWeek.toLocaleDateString();
        break;
      case "yearly":
        timeLabel = new Date(session.startTime).getFullYear().toString(); // Group by year
        break;
      default:
        timeLabel = new Date(session.startTime).toLocaleDateString();
    }

    if (!groupedData[timeLabel]) {
      groupedData[timeLabel] = {};
    }

    if (!groupedData[timeLabel][session.parkingSpace.name]) {
      groupedData[timeLabel][session.parkingSpace.name] = 0;
    }

    groupedData[timeLabel][session.parkingSpace.name] += duration;
  });

  // Convert to array format suitable for recharts
  return Object.entries(groupedData).map(([timeLabel, spaces]) => ({
    timeLabel,
    ...spaces,
  }));
}
