import React, { useState, useCallback } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Polygon,
  Marker,
} from "@react-google-maps/api";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Undo, Save, MapPin } from "lucide-react";

const mapContainerStyle = {
  width: "100%",
  height: "400px",
  borderRadius: "0.5rem",
};

const center = {
  lat: 9.7772981,
  lng: 118.7332374,
};

const options = {
  fillColor: "red",
  fillOpacity: 0.35,
  strokeColor: "red",
  strokeOpacity: 0.8,
  strokeWeight: 2,
  clickable: false,
  draggable: false,
  editable: false,
  geodesic: false,
  zIndex: 1,
};

type Coordinate = {
  lat: number;
  lng: number;
};

interface MapPickerProps {
  onLocationPicked: (lat: number, lng: number) => void;
  onPolygonComplete?: (polygonString: string) => void; // Made optional with ?
  isLoaded: any;
}

const MapPolygonCreator = ({
  onLocationPicked,
  onPolygonComplete,
  isLoaded,
}: MapPickerProps) => {
  //   const { isLoaded } = useJsApiLoader({
  //     id: "google-map-script",
  //     googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  //   });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [coordinates, setCoordinates] = useState<Coordinate[]>([]);
  const [error, setError] = useState("");
  const [isDrawing, setIsDrawing] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<Coordinate | null>(
    null
  );

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const addPoint = (event: google.maps.MapMouseEvent) => {
    if (!isDrawing) {
      // If not drawing polygon, handle location picking
      const lat = event.latLng?.lat() || 0;
      const lng = event.latLng?.lng() || 0;
      setSelectedLocation({ lat, lng });
      onLocationPicked(lat, lng);
      return;
    }

    const newCoord = {
      lat: event.latLng?.lat() || 0,
      lng: event.latLng?.lng() || 0,
    };
    setCoordinates((prev) => [...prev, newCoord]);
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
    // Convert coordinates to JSON string and call the callback if it exists
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

      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={17}
          onLoad={onLoad}
          onUnmount={onUnmount}
          onClick={addPoint}
          options={{
            streetViewControl: false,
            mapTypeControl: false,
          }}
        >
          {/* Show selected location marker when not drawing */}
          {!isDrawing && selectedLocation && (
            <Marker position={selectedLocation} />
          )}

          {/* Show polygon and vertices when drawing */}
          {coordinates.length > 0 && (
            <>
              <Polygon paths={coordinates} options={options} />
              {coordinates.map((coord, index) => (
                <Marker
                  key={index}
                  position={coord}
                  icon={{
                    path: "M-1.547 12l6.563-6.609-6.563-6.609-4.66 4.696 4.66 4.696-4.66 4.696z",
                    fillColor: "#fff",
                    fillOpacity: 1,
                    strokeColor: "#000",
                    strokeWeight: 2,
                    scale: 1,
                  }}
                />
              ))}
            </>
          )}
        </GoogleMap>
      ) : (
        <div className="w-full h-96 flex items-center justify-center bg-gray-100 rounded-lg">
          Loading Map...
        </div>
      )}

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

export default MapPolygonCreator;
