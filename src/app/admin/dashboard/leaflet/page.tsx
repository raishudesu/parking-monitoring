import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import SideSheetMap from "@/app/gpo/dashboard/map/side-sheet-map";
import { getAllParkingSpacesUseCase } from "@/use-cases/parking-spaces";

const Page = async () => {
  const LeafletMap = dynamic(() => import("./leaflet-map"), {
    ssr: false,
    loading: () => <Skeleton className=" h-full w-full" />,
  });

  const parkingSpaces = await getAllParkingSpacesUseCase();

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
      <h2 className="py-6 text-muted-foreground scroll-m-20 text-2xl tracking-tight lg:text-3xl">
        Parking Space Visualization
      </h2>
      <LeafletMap parkingSpaces={parkingSpaces} />
    </div>
  );
};

export default Page;
