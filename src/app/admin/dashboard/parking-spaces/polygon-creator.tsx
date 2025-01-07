"use client";

import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Polygon,
  Marker,
  useMapEvents,
} from "react-leaflet";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Undo, Save, MapPin } from "lucide-react";
import "leaflet/dist/leaflet.css";

// const mapContainerStyle = {
//   width: "100%",
//   height: "400px",
//   borderRadius: "0.5rem",
// };

const center = {
  lat: 9.7772981,
  lng: 118.7332374,
};

type Coordinate = {
  lat: number;
  lng: number;
};

interface MapPolygonCreatorProps {
  onLocationPicked: (lat: number, lng: number) => void;
  onPolygonComplete?: (polygonString: string) => void; // Optional callback
}

const PolygonCreator = ({
  onLocationPicked,
  onPolygonComplete,
}: MapPolygonCreatorProps) => {
  const [coordinates, setCoordinates] = useState<Coordinate[]>([]);
  const [error, setError] = useState("");
  const [isDrawing, setIsDrawing] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<Coordinate | null>(
    null
  );

  const MapClickHandler = () => {
    useMapEvents({
      click: (e) => {
        if (!isDrawing) {
          const lat = e.latlng.lat;
          const lng = e.latlng.lng;
          setSelectedLocation({ lat, lng });
          onLocationPicked(lat, lng);
          return;
        }

        const newCoord = { lat: e.latlng.lat, lng: e.latlng.lng };
        setCoordinates((prev) => [...prev, newCoord]);
      },
    });
    return null;
  };

  const startDrawing = () => {
    setIsDrawing(true);
    setError("");
    setCoordinates([]);
  };

  const undoLastPoint = () => {
    if (coordinates.length > 0) {
      setCoordinates((prev) => prev.slice(0, -1));
    }
  };

  const finishDrawing = () => {
    if (coordinates.length < 3) {
      setError("At least 3 points are needed to form a polygon");
      return;
    }

    setIsDrawing(false);
    if (onPolygonComplete) {
      const polygonString = JSON.stringify(coordinates);
      onPolygonComplete(polygonString);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        {isDrawing ? (
          <>
            <Button
              type="button"
              onClick={undoLastPoint}
              variant="outline"
              disabled={coordinates.length === 0}
              className="flex items-center gap-2"
            >
              <Undo className="h-4 w-4" /> Undo
            </Button>
            <Button
              type="button"
              onClick={finishDrawing}
              className="flex items-center gap-2"
            >
              <Save className="h-4 w-4" /> Finish
            </Button>
          </>
        ) : (
          <Button
            type="button"
            onClick={startDrawing}
            className="flex items-center gap-2"
          >
            <MapPin className="h-4 w-4" /> Draw Polygon
          </Button>
        )}
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="w-full h-96">
        <MapContainer
          center={center}
          zoom={17}
          style={{ height: "100%", width: "100%" }}
          //   className=" w-full max-h-96 z-20"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          <MapClickHandler />

          {!isDrawing && selectedLocation && (
            <Marker position={[selectedLocation.lat, selectedLocation.lng]} />
          )}

          {coordinates.length > 0 && (
            <Polygon
              positions={coordinates.map((coord) => [coord.lat, coord.lng])}
            />
          )}
        </MapContainer>
      </div>

      {isDrawing && (
        <Alert>
          <AlertDescription>
            Click on the map to add points. Click &lsquo;Finish&lsquo; when
            done.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default PolygonCreator;
