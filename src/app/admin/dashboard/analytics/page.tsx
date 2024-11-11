import OccupancyAnalysis from "./occupancy-analysis";
import PeakHoursAnalysis from "./peak-hours-analysis";
import SpaceUtilAnalysis from "./space-util-analysis";
import UserBehaviorAnalysis from "./user-behavior-analysis";

const AnalyticsPage = () => {
  return (
    <div className="w-full flex flex-col p-6">
      <div className="pb-6 flex flex-col gap-3">
        <div className="text-lg text-muted-foreground">
          Administrator Dashboard
        </div>
        <h1 className="text-primary scroll-m-20 text-4xl tracking-tight lg:text-5xl">
          Analytics
        </h1>
      </div>
      <div className="w-full mt-6 ">
        <div className="w-full h-full flex flex-col xl:grid xl:grid-cols-2 gap-4 ">
          <PeakHoursAnalysis />
          <OccupancyAnalysis />
          <UserBehaviorAnalysis />
          <SpaceUtilAnalysis />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
