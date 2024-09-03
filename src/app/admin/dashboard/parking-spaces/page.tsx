import { getAllParkingSpacesUseCase } from "@/use-cases/parking-spaces";
import { ParkingSpaceTable } from "./parking-space-table";

const ParkingSpacesPage = async () => {
  const parkingSpaces = await getAllParkingSpacesUseCase();

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
      <div>
        <ParkingSpaceTable data={parkingSpaces} />
      </div>
    </div>
  );
};

export default ParkingSpacesPage;
