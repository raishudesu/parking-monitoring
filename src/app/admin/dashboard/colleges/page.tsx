import { CollegeData, CollegesTable } from "./colleges-table";
import { getAllCollegesUseCase } from "@/use-cases/colleges";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

const CollegePage = async () => {
  let colleges: CollegeData[] | null = null;
  let error: string | null = null;

  try {
    const fetchedColleges = await getAllCollegesUseCase();

    colleges = fetchedColleges as CollegeData[];
  } catch (err) {
    console.error("Error fetching data:", err);
    error =
      "There was an error fetching the colleges data. Please try again later";
  }

  return (
    <div className="w-full flex flex-col p-6">
      <div className="pb-6 flex flex-col gap-3">
        <div className="text-lg text-muted-foreground">
          Administrator Dashboard
        </div>
        <h1 className="text-primary scroll-m-20 text-4xl tracking-tight lg:text-5xl">
          Colleges
        </h1>
      </div>
      {error ? (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : colleges ? (
        <CollegesTable data={colleges} />
      ) : (
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>No Data</AlertTitle>
          <AlertDescription>
            No college data available at the moment.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default CollegePage;
