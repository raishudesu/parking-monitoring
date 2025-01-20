"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PanellumViewerDialog from "./map/panellum-viewer-dialog";
import { PannellumProps, ParkingSpaceWithImages } from "@/types/map";

const supabase = createClient();

const AvailableParkingSpaces = ({
  parkingSpaces,
}: {
  parkingSpaces: ParkingSpaceWithImages[];
}) => {
  const [selectedParkingSpaceData, setSelectedParkingSpaceData] =
    useState<PannellumProps | null>(null);
  const router = useRouter();

  useEffect(() => {
    const channel = supabase
      .channel("parking-space")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "ParkingSpace" },
        () => {
          router.refresh();
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  return (
    <>
      <div className="w-full h-full gap-4">
        <small className="text-primary font-bold">Parking Spaces</small>
        <Tabs defaultValue="overview" className="w-full space-y-4">
          <TabsContent value="overview" className="w-full space-y-4">
            <div className="w-full grid md:grid-cols-2 gap-4">
              {parkingSpaces.length === 0 ? (
                <Card className="col-span-2">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-md font-medium">
                      No available parking spaces.
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mt-6 text-xs text-muted-foreground">
                      Try again later!
                    </p>
                  </CardContent>
                </Card>
              ) : (
                parkingSpaces.map(
                  ({
                    id,
                    name,
                    description,
                    currCapacity,
                    maxCapacity,
                    currReservedCapacity,
                    reservedCapacity,
                    spaceType,
                    images,
                  }) => (
                    <Card
                      key={id}
                      onClick={() =>
                        setSelectedParkingSpaceData({
                          parkingName: name,
                          images,
                        })
                      }
                      className="cursor-pointer"
                    >
                      <CardHeader className="flex flex-row flex-wrap items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-md font-bold text-primary">
                          {name}
                        </CardTitle>
                        <div className="text-sm font-bold text-muted-foreground">
                          {spaceType}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div
                          className={`mt-3 text-sm font-bold ${currCapacity === maxCapacity
                            ? "text-destructive"
                            : "text-green-500"
                            }`}
                        >
                          Slots: {currCapacity}/{maxCapacity}
                        </div>
                        <div
                          className={`mt-3 text-sm text-green-500 font-bold ${currReservedCapacity === reservedCapacity
                            }  ? "text-destructive"
                              : "text-green-500"`}
                        >
                          Reserved: {currReservedCapacity}/{reservedCapacity}
                        </div>
                        <p className="mt-6 text-xs text-muted-foreground">
                          {description}
                        </p>
                        <div className="mt-4">
                          <PanellumViewerDialog
                            parkingName={name}
                            images={images}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ),
                )
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      {/* <div className="mt-6 w-full h-full gap-4 ">
        <small className="text-destructive font-bold">
          Unavailable Parking Spaces
        </small>
        <Tabs defaultValue="overview" className="w-full space-y-4">
          <TabsContent value="overview" className="w-full space-y-4">
            <div className="w-full grid md:grid-cols-2 gap-4">
              {unavailableParkingSpaces.length === 0 ? (
                <Card className="col-span-2">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-md font-medium">
                      No unavailable parking spaces.
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mt-6 text-xs text-muted-foreground">
                      Happy parking!
                    </p>
                  </CardContent>
                </Card>
              ) : (
                unavailableParkingSpaces.map(
                  ({
                    id,
                    name,
                    description,
                    currCapacity,
                    maxCapacity,
                    currReservedCapacity,
                    reservedCapacity,
                    spaceType,
                  }) => (
                    <Card key={id}>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-lg font-bold text-primary">
                          {name}
                        </CardTitle>
                        <div className="text-sm font-bold text-muted-foreground">
                          {spaceType}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="mt-3 text-sm text-red-500 font-bold">
                          Capacity: {currCapacity}/{maxCapacity}
                        </div>
                        <div className="mt-3 text-sm text-green-500 font-bold">
                          Reserved: {currReservedCapacity}/{reservedCapacity}
                        </div>
                        <p className="mt-6 text-xs text-muted-foreground">
                          {description}
                        </p>
                      </CardContent>
                    </Card>
                  )
                )
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div> */}
    </>
  );
};

export default AvailableParkingSpaces;
