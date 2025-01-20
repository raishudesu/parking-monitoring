"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Tooltip,
  Polygon,
} from "react-leaflet";
import { ChevronUp, MapPin } from "lucide-react";
import { parkingGreen, parkingRed, userPin } from "./icons";
import { ParkingSpaceWithImages } from "@/types/map";
import {
  calculateDistance,
  calculatePolygonCenter,
  parsePolygonCoordinates,
} from "@/utils/leaflet-map-utils";
import "leaflet/dist/leaflet.css";
import PanellumViewerDialog from "@/app/gpo/dashboard/map/panellum-viewer-dialog";
import { useState, useEffect, Fragment, useCallback } from "react";
import { Button } from "@/components/ui/button";
import RoutingComponent from "./routing-component";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import PanToLocationButton from "./pan-to-user-location";
import { useSession } from "next-auth/react";

export interface LatLng {
  lat: number;
  lng: number;
}

const LeafletMap = ({
  parkingSpaces,
}: {
  parkingSpaces: ParkingSpaceWithImages[];
}) => {
  const PSU_GATE = [9.778344, 118.73564];

  const [drawerOpen, setDrawerOpen] = useState(false);

  const [userLocation, setUserLocation] = useState<LatLng | null>(null);

  const [selectedParkingSpace, setSelectedParkingSpace] =
    useState<LatLng | null>(null);

  const session = useSession();

  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const currentLocation: LatLng = { lat: latitude, lng: longitude };
          setUserLocation(currentLocation);
        },
        (error) => {
          console.error("Error getting location:", error);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );

      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, []);

  const isSelected = (latitude: string, longitude: string): boolean => {
    if (!selectedParkingSpace) return false;
    return (
      selectedParkingSpace.lat === parseFloat(latitude) &&
      selectedParkingSpace.lng === parseFloat(longitude)
    );
  };

  const handleParkingSpaceClick = (parkingSpace: {
    lng: number;
    lat: number;
  }) => {
    setSelectedParkingSpace(parkingSpace);
    setDrawerOpen(false);
  };

  const findClosestPoint = useCallback(
    (priorityType: "PWD" | "VIP" | "NONE") => {
      let minDistance = Infinity;
      let closest = null;

      for (const point of parkingSpaces) {
        const center = calculatePolygonCenter(
          parsePolygonCoordinates(point.polygon as string)
        );

        const distance = calculateDistance(userLocation as LatLng, {
          lat: center.lat,
          lng: center.lng,
        });

        if (priorityType !== "NONE") {
          if (distance < minDistance && point.spaceType === priorityType) {
            minDistance = distance;
            closest = {
              lat: parseFloat(point.latitude as string),
              lng: parseFloat(point.longitude as string),
            };
          }
        } else {
          if (distance < minDistance) {
            minDistance = distance;
            closest = {
              lat: parseFloat(point.latitude as string),
              lng: parseFloat(point.longitude as string),
            };
          }
        }
      }

      if (closest) {
        setSelectedParkingSpace(closest);
      }

      setDrawerOpen(false);
    },
    [parkingSpaces, userLocation]
  );

  return (
    <div className="relative px-4 w-full ">
      <MapContainer
        center={[PSU_GATE[0], PSU_GATE[1]]}
        zoom={18}
        scrollWheelZoom={true}
        className="relative w-full min-h-[80vh] md:min-h-screen z-10 rounded-xl"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          className="z-10"
        />
        {userLocation && <Marker position={userLocation} icon={userPin} />}
        {selectedParkingSpace && (
          <RoutingComponent
            //start={[PSU_GATE[0], PSU_GATE[1]]}
            start={[userLocation?.lat as number, userLocation?.lng as number]}
            end={[
              selectedParkingSpace?.lat || 0,
              selectedParkingSpace?.lng || 0,
            ]}
            fitBounds={false}
          />
        )}
        {parkingSpaces.map((parkingSpace) => (
          <Fragment key={parkingSpace.id}>
            <Marker
              key={parkingSpace.id}
              position={[
                calculatePolygonCenter(
                  parsePolygonCoordinates(parkingSpace.polygon as string)
                ).lat,
                calculatePolygonCenter(
                  parsePolygonCoordinates(parkingSpace.polygon as string)
                ).lng,
              ]}
              icon={
                parkingSpace.currCapacity === parkingSpace.maxCapacity
                  ? parkingRed
                  : parkingGreen
              }
            >
              <Tooltip direction="top" offset={[0, -20]} opacity={1} permanent>
                <span>{parkingSpace.name}</span>
              </Tooltip>
              <Popup>
                <div className="flex flex-col gap-3">
                  <div className="text-primary flex flex-row gap-2 items-center justify-between">
                    <div className="flex flex-row gap-2 items-center">
                      <MapPin size={24} />
                      <span className="font-bold">{parkingSpace.name}</span>
                    </div>
                    <div className="font-bold">
                      <span>{parkingSpace.spaceType}</span>
                    </div>
                  </div>
                  <div className="flex flex-row gap-2">
                    Description: <span>{parkingSpace.description}</span>
                  </div>
                  <div className="flex flex-col font-bold">
                    <div
                      className={`flex flex-row gap-2 ${
                        parkingSpace.currCapacity === parkingSpace.maxCapacity
                          ? "text-red-500"
                          : "text-green-500"
                      }`}
                    >
                      Slots: {parkingSpace.currCapacity}/
                      {parkingSpace.maxCapacity}
                    </div>
                    <div
                      className={`flex flex-row gap-2 ${
                        parkingSpace.currReservedCapacity ===
                        parkingSpace.reservedCapacity
                          ? "text-red-500"
                          : "text-green-500"
                      }`}
                    >
                      Reserved: {parkingSpace.currReservedCapacity}/
                      {parkingSpace.reservedCapacity}
                    </div>
                    <div className="w-full mt-6">
                      <PanellumViewerDialog
                        parkingName={parkingSpace.name}
                        images={parkingSpace.images}
                      />
                    </div>
                  </div>
                </div>
              </Popup>
            </Marker>
            <Polygon
              positions={parsePolygonCoordinates(
                parkingSpace.polygon as string
              )}
              color={
                parkingSpace.currCapacity === parkingSpace.maxCapacity
                  ? "red"
                  : "green"
              }
            />
          </Fragment>
        ))}
        <PanToLocationButton userLocation={userLocation} />
      </MapContainer>

      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
        <DrawerTrigger asChild>
          <Button
            size="lg"
            className="z-20 absolute bottom-20 left-1/2 transform -translate-x-1/2 rounded-full"
          >
            <ChevronUp />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="max-h-screen">
          <div className="overflow-auto mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>Select Parking Space</DrawerTitle>
              <DrawerDescription>
                You can also view the nearest parking space.
              </DrawerDescription>
            </DrawerHeader>
            <div className="p-4 pb-0">
              <div className="grid  gap-3">
                {parkingSpaces.map(
                  ({
                    id,
                    name,
                    currCapacity,
                    maxCapacity,
                    currReservedCapacity,
                    reservedCapacity,
                    latitude,
                    longitude,
                    polygon,
                    spaceType,
                  }) => (
                    <div
                      key={id}
                      className={`p-3 rounded-xl border cursor-pointer hover:shadow transition-colors ease-in-out ${
                        isSelected(
                          (latitude = calculatePolygonCenter(
                            parsePolygonCoordinates(polygon as string)
                          ).lat.toString()),
                          (longitude = calculatePolygonCenter(
                            parsePolygonCoordinates(polygon as string)
                          ).lng.toString())
                        )
                          ? "border-blue-500 bg-blue-50 dark:bg-blue-900 dark:border-blue-700"
                          : ""
                      }`}
                      onClick={() =>
                        handleParkingSpaceClick(
                          calculatePolygonCenter(
                            parsePolygonCoordinates(polygon as string)
                          )
                        )
                      }
                    >
                      <div className="flex">
                        <h2>{name}</h2>
                        <small className="ml-auto text-sm text-muted-foreground">
                          {spaceType}
                        </small>
                      </div>
                      <div className="flex justify-between">
                        <small
                          className={`mt-3 text-sm ${
                            currCapacity === maxCapacity
                              ? "text-destructive"
                              : "text-green-500"
                          }`}
                        >
                          Slots: {currCapacity}/{maxCapacity}
                        </small>
                        <small
                          className={`mt-3 text-sm text-green-500 ${
                            currReservedCapacity === reservedCapacity
                          }  ? "text-destructive"
                              : "text-green-500"`}
                        >
                          Reserved: {currReservedCapacity}/{reservedCapacity}
                        </small>
                      </div>
                    </div>
                  )
                )}
              </div>

              <DrawerFooter>
                {userLocation && (
                  <Button
                    className="mt-6"
                    onClick={() => findClosestPoint("NONE")}
                  >
                    Show closest parking space
                  </Button>
                )}

                {session.data?.user.isPWD && userLocation && (
                  <Button
                    variant={"secondary"}
                    onClick={() => findClosestPoint("PWD")}
                  >
                    Show closest PWD parking space
                  </Button>
                )}
                {session.data?.user.isVIP && userLocation && (
                  <Button
                    variant={"secondary"}
                    onClick={() => findClosestPoint("VIP")}
                  >
                    Show closest VIP parking space
                  </Button>
                )}
                <DrawerClose asChild>
                  <Button variant="outline">Close</Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default LeafletMap;
