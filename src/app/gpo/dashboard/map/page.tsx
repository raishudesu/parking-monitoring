import { getAllParkingSpacesUseCase } from "@/use-cases/parking-spaces";
import DijkstraMap from "./dijkstra-map";

const MapPage = async () => {
  const parkingSpaces = await getAllParkingSpacesUseCase();

  return (
    <div className="w-full flex flex-col py-3 px-3 md:px-6">
      <div className="pb-6 flex flex-col gap-3">
        <div className="text-lg text-muted-foreground">Dashboard</div>
        <h1 className="scroll-m-20 text-4xl tracking-tight lg:text-5xl">
          Map 📌{" "}
        </h1>
        <small className="text-sm font-medium text-muted-foreground leading-none">
          Displays parking spaces inside Palawan State Univerity.
        </small>
      </div>

      <div className="mt-6">
        <DijkstraMap parkingSpaces={parkingSpaces} />
      </div>
    </div>
  );
};

export default MapPage;
