"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Tooltip,
  Polygon,
} from "react-leaflet";
import { MapPin } from "lucide-react";
import { parkingGreen } from "./icons";
import { PannellumProps, ParkingSpaceWithImages } from "@/types/map";
import { calculatePolygonCenter, parsePolygonCoordinates } from "./utils";
import "leaflet/dist/leaflet.css";
import PanellumViewerDialog from "@/app/gpo/dashboard/map/panellum-viewer-dialog";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const LeafletMap = ({
  parkingSpaces,
}: {
  parkingSpaces: ParkingSpaceWithImages[];
}) => {
  const [selectedParkingSpaceData, setSelectedParkingSpaceData] =
    useState<PannellumProps | null>(null);

  return (
    <>
      <PanellumViewerDialog
        parkingName={selectedParkingSpaceData?.parkingName || ""}
        images={selectedParkingSpaceData?.images}
        open={selectedParkingSpaceData !== null}
        setOpen={(value) =>
          setSelectedParkingSpaceData(value ? selectedParkingSpaceData : null)
        }
      />
      <MapContainer
        center={[9.7787, 118.7341]}
        zoom={18}
        scrollWheelZoom={true}
        className="w-full h-[80vh] z-10 rounded-xl"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {parkingSpaces.map((parkingSpace) => (
          <>
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
                  {parkingSpace.images.length > 0 && (
                    <Button
                      onClick={() =>
                        setSelectedParkingSpaceData({
                          parkingName: parkingSpace.name,
                          images: parkingSpace.images,
                        })
                      }
                    >
                      View Panoramic View
                    </Button>
                  )}
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
          </>
        ))}
      </MapContainer>
    </>
  );
};

export default LeafletMap;
