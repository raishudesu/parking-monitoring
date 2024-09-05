import DijkstraMap from "./dijkstra-map";

const MapPage = () => {
  return (
    <div className="w-full flex flex-col py-6 px-3 md:px-6">
      <div className="pb-6 flex flex-col gap-3">
        <div className="text-lg text-muted-foreground">Dashboard</div>
        <h1 className="scroll-m-20 text-4xl tracking-tight lg:text-5xl">
          Map 📌{" "}
        </h1>
        <small className="text-sm font-medium text-muted-foreground leading-none">
          Displays closest parking space relative to your location.
        </small>
      </div>

      <div className="mt-6">
        <DijkstraMap />
      </div>
    </div>
  );
};

export default MapPage;
