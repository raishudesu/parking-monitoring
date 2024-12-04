// import ParkingSystemSurvey from "./user-survey-form";
import { ScrollArea } from "@/components/ui/scroll-area";
import ReportForm from "./report-form";
import { getParkingSpaceOptionsUseCase } from "@/use-cases/parking-spaces";

const SubmitReportPage = async () => {
  const parkingSpaceOptions = await getParkingSpaceOptionsUseCase();

  return (
    <div className="w-full flex flex-col p-6">
      <div className="pb-6 flex flex-col gap-3">
        <div className="text-lg text-muted-foreground">Dashboard</div>
        <h1 className="text-primary scroll-m-20 text-4xl tracking-tight lg:text-5xl">
          Submit Report
        </h1>
        <small className="text-sm text-muted-foreground max-w-2xl">
          To effectively address the issue, please include specific details such
          as the time and location of the incident. If available, attach images
          that provide evidence, such as driver details (e.g., Gate Pass Number
          or vehicle information).
        </small>
      </div>
      <ScrollArea>
        <ReportForm parkingSpaceOptions={parkingSpaceOptions} />
      </ScrollArea>
    </div>
  );
};

export default SubmitReportPage;
