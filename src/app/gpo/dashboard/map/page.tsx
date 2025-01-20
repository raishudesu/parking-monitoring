import { getAllParkingSpacesUseCase } from "@/use-cases/parking-spaces";
import SideSheetMap from "./side-sheet-map";
import LeafletMap from "@/components/leaflet-map";

const MapPage = async () => {
  const parkingSpaces = await getAllParkingSpacesUseCase();

  return (
    <div className="relative w-full flex flex-col">
      <div className="lg:hidden p-6 w-full backdrop-blur-xl z-10 flex flex-col gap-3">
        <div className="flex items-center gap-4">
          <SideSheetMap />
          <h1 className="scroll-m-20 text-2xl text-primary font-bold tracking-tight lg:text-5xl">
            ParkSU
          </h1>
        </div>
      </div>
      <LeafletMap parkingSpaces={parkingSpaces} />
    </div>
  );
};

export default MapPage;
