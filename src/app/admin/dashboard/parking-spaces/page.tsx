import { getAllParkingSpacesUseCase } from "@/use-cases/parking-spaces";
import { ParkingSpaceTable } from "./parking-space-table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { ParkingSpaceWithImages } from "@/app/gpo/dashboard/map/dijkstra-map";
import dynamic from "next/dynamic";

const LeafletMap = dynamic(() => import("@/components/leaflet-map"), {
  ssr: false,
});

const ParkingSpacesPage = async () => {
  let parkingSpaces: ParkingSpaceWithImages[] | null = null;
  let error: string | null = null;

  try {
    const fetchedParkingSpaces = await getAllParkingSpacesUseCase();
    parkingSpaces = fetchedParkingSpaces as ParkingSpaceWithImages[];
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
        <h1 className="text-primary scroll-m-20 text-4xl tracking-tight lg:text-5xl">
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
        <>
          <ParkingSpaceTable data={parkingSpaces} />
          <h2 className="py-6 text-muted-foreground scroll-m-20 text-2xl tracking-tight lg:text-3xl">
            Parking Space Visualization
          </h2>
          <LeafletMap parkingSpaces={parkingSpaces} />
        </>
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
