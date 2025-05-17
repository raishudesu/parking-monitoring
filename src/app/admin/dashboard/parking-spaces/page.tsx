import { getAllParkingSpacesUseCase } from "@/use-cases/parking-spaces";
import { ParkingSpaceTable } from "./parking-space-table";
import dynamic from "next/dynamic";
import { ParkingSpaceType } from "@prisma/client";
import { Suspense } from "react";
import LoadingTable from "@/components/loading-table";
import { getAllParkingSpacesForGpo } from "@/data-access/parking-spaces";

const LeafletMap = dynamic(() => import("@/components/leaflet-map"), {
  ssr: false,
});

const ParkingSpaceTableWithData = async ({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    name?: string;
    spaceType?: ParkingSpaceType;
  }>;
}) => {
  const awaitedParams = await searchParams;
  const currentPage = Number(awaitedParams.page) || 1;
  const pageSize = 10;
  const nameFilter = awaitedParams.name || "";
  const spaceTypeFilter = awaitedParams.spaceType || undefined;

  const { data, totalCount, pageCount } = await getAllParkingSpacesUseCase({
    page: currentPage,
    limit: pageSize,
    nameFilter,
    spaceTypeFilter,
  });

  return (
    <ParkingSpaceTable
      data={data}
      totalCount={totalCount}
      pageCount={pageCount}
      currentPage={currentPage}
    />
  );
};

const ParkingSpacesPage = async ({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    name?: string;
    spaceType?: ParkingSpaceType;
  }>;
}) => {
  const parkingSpaces = await getAllParkingSpacesForGpo();

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

      <Suspense fallback={<LoadingTable />}>
        <ParkingSpaceTableWithData searchParams={searchParams} />
        <LeafletMap parkingSpaces={parkingSpaces} />
      </Suspense>
    </div>
  );
};

export default ParkingSpacesPage;
