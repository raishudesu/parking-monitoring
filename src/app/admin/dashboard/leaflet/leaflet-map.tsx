"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Tooltip,
  Polygon,
} from "react-leaflet";
import { ChevronUp, Crosshair, MapPin } from "lucide-react";
import { parkingGreen, userPin } from "./icons";
import { PannellumProps, ParkingSpaceWithImages } from "@/types/map";
import { calculatePolygonCenter, parsePolygonCoordinates } from "./utils";
import "leaflet/dist/leaflet.css";
import PanellumViewerDialog from "@/app/gpo/dashboard/map/panellum-viewer-dialog";
import { useState, useEffect, useCallback, Fragment } from "react";
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

interface LatLng {
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

  return (
    <div className="relative w-full h-[80vh]">
      <MapContainer
        center={[PSU_GATE[0], PSU_GATE[1]]}
        zoom={18}
        scrollWheelZoom={true}
        className="relative w-full h-[80vh] z-10 rounded-xl"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          className="z-10"
        />
        {/* {userLocation && <Marker position={userLocation} icon={userPin} />} */}
        {userLocation && (
          <Marker position={[PSU_GATE[0], PSU_GATE[1]]} icon={userPin} />
        )}
        {selectedParkingSpace && (
          <RoutingComponent
            start={[PSU_GATE[0], PSU_GATE[1]]}
            end={[
              selectedParkingSpace?.lat || 0,
              selectedParkingSpace?.lng || 0,
            ]}
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
              icon={parkingGreen}
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
      </MapContainer>
      <Button
        size="icon"
        className="z-20 absolute bottom-20 right-6 rounded-full"
        // onClick={handleCenterOnUser}
      >
        <Crosshair />
      </Button>
      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
        <DrawerTrigger asChild>
          <Button
            size="lg"
            className="z-20 absolute bottom-20 left-1/2 transform -translate-x-1/2 rounded-full"
            // className="rounded-full"
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
                {/* <Button className="mt-6" onClick={handleShowClosestClick}>
                  Show closest parking space
                </Button>
                {session.data?.user.isPWD && (
                  <Button
                    variant={"secondary"}
                    onClick={handleShowClosestPwdClick}
                  >
                    Show closest PWD parking space
                  </Button>
                )}
                {session.data?.user.isVIP && (
                  <Button
                    variant={"secondary"}
                    onClick={handleShowClosestVipClick}
                  >
                    Show closest VIP parking space
                  </Button>
                )} */}
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
