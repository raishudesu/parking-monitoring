import React from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { MapPickerProps, MarkerPosition } from "@/types/admin-parking";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 9.7772981,
  lng: 118.7332374,
};

const MapPicker: React.FC<MapPickerProps> = ({ onLocationPicked }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  const [map, setMap] = React.useState<google.maps.Map | null>(null);
  const [marker, setMarker] = React.useState<MarkerPosition | null>(null);

  const onLoad = React.useCallback(function callback(map: google.maps.Map) {
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map: google.maps.Map) {
    setMap(null);
  }, []);

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    const lat = event.latLng?.lat() || 0;
    const lng = event.latLng?.lng() || 0;
    setMarker({ lat, lng });
    onLocationPicked(lat, lng);
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={17}
      onLoad={onLoad}
      onUnmount={onUnmount}
      onClick={handleMapClick}
    >
      {marker && <Marker position={marker} />}
    </GoogleMap>
  ) : (
    <></>
  );
};

export default React.memo(MapPicker);
