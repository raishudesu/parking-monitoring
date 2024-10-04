import { getAllParkingSpacesUseCase } from "@/use-cases/parking-spaces";
import { ParkingSpaceTable } from "./parking-space-table";
import { ParkingSpace } from "@prisma/client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

const ParkingSpacesPage = async () => {
  let parkingSpaces: ParkingSpace[] | null = null;
  let error: string | null = null;

  try {
    const fetchedParkingSpaces = await getAllParkingSpacesUseCase();
    parkingSpaces = fetchedParkingSpaces as ParkingSpace[];
  } catch (err) {
    console.error("Error fetching data:", err);
    error =
      "There was an error fetching the colleges data. Please try again later.";
  }

  return (
    <div className="w-full flex flex-col p-6">
      <div className="pb-6 flex flex-col gap-3">
        <div className="text-lg text-muted-foreground">
          Administrator Dashboard
        </div>
        <h1 className="scroll-m-20 text-4xl tracking-tight lg:text-5xl">
          Parking Spaces
        </h1>
      </div>
      {error ? (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : parkingSpaces ? (
        <ParkingSpaceTable data={parkingSpaces} />
      ) : (
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>No Data</AlertTitle>
          <AlertDescription>
            No parking space data available at the moment.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default ParkingSpacesPage;
