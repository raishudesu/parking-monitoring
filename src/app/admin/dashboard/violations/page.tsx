import { getAllGpoViolationsUseCase } from "@/use-cases/gpo-violations";
import { ViolationsData, ViolationsTable } from "./violations-table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

const ViolationsPage = async () => {
  let violations: ViolationsData[] | null = null;
  let error: string | null = null;

  try {
    const fetchedViolations = await getAllGpoViolationsUseCase();
    violations = fetchedViolations as ViolationsData[];
  } catch (err) {
    console.error("Error fetching data:", err);
    error = "There was an error fetching the GPO violations data.";
  }

  return (
    <div className="w-full flex flex-col py-6 px-3 md:px-6">
      <div className="pb-6 flex flex-col gap-3">
        <div className="text-lg text-muted-foreground">
          Administrator Dashboard
        </div>
        <h1 className="text-primary scroll-m-20 text-4xl tracking-tight lg:text-5xl">
          Violations
        </h1>
      </div>
      {error ? (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : violations ? (
        <ViolationsTable data={violations} />
      ) : (
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>No Data</AlertTitle>
          <AlertDescription>
            No GPO sessions data available at the moment.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default ViolationsPage;
