import { getBehaviorReportByIdUseCase } from "@/use-cases/driver-behavior-report";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { DisplayReport } from "./display-report";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const ReportPage = async ({ params }: { params: Params }) => {
  const { id } = params;

  const report = await getBehaviorReportByIdUseCase(id);
  return (
    <div className="w-full flex flex-col p-6">
      <div className="pb-6 flex flex-col gap-3">
        <div className="text-lg text-muted-foreground">
          Administrator Dashboard
        </div>
        <h1 className="text-primary scroll-m-20 text-4xl tracking-tight lg:text-5xl">
          Report Submission
        </h1>
      </div>
      {report ? (
        <DisplayReport report={report} />
      ) : (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Not Available</AlertTitle>
          <AlertDescription>
            This report is either not existing or not available.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default ReportPage;
