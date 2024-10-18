import { getPeakHoursDataUseCase } from "@/use-cases/analytics";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import dynamic from "next/dynamic";

const PeakHoursChart = dynamic(() => import("./peak-hours-chart"), {
  ssr: false,
});

const PeakHoursAnalysis = async () => {
  const data = await getPeakHoursDataUseCase();

  if (!data) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Data is not available right now.</AlertDescription>
      </Alert>
    );
  }

  return <PeakHoursChart data={data} />;
};

export default PeakHoursAnalysis;
