import { getAllBehaviorReportsUseCase } from "@/use-cases/driver-behavior-report";
import { ReportList } from "./report-card";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const ReportsPage = async () => {
  const reports = await getAllBehaviorReportsUseCase();
  return (
    <div className="w-full flex flex-col p-6">
      <div className="pb-6 flex flex-col gap-3">
        <div className="text-lg text-muted-foreground">
          Administrator Dashboard
        </div>
        <h1 className="text-primary scroll-m-20 text-4xl tracking-tight lg:text-5xl">
          Report Submissions
        </h1>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.length === 0 && (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Not Available</AlertTitle>
            <AlertDescription>
              This report is either not existing or not available.
            </AlertDescription>
          </Alert>
        )}
        <ReportList reports={reports} />
      </div>
    </div>
  );
};

export default ReportsPage;
