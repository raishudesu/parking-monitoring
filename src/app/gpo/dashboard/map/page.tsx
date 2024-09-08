import { getAllParkingSpacesUseCase } from "@/use-cases/parking-spaces";
import DijkstraMap from "./dijkstra-map";
import SideSheetMap from "./side-sheet-map";

const MapPage = async () => {
  const parkingSpaces = await getAllParkingSpacesUseCase();

  return (
    <div className="relative w-full flex flex-col">
      <div className="p-6 w-full backdrop-blur-xl z-10 absolute top-0 flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <SideSheetMap />
          <h1 className="scroll-m-20 text-2xl text-primary font-bold tracking-tight lg:text-5xl">
            ParkSU
          </h1>
        </div>
      </div>

      <DijkstraMap parkingSpaces={parkingSpaces} />
    </div>
  );
};

export default MapPage;
