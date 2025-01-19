import { Button } from "@/components/ui/button";
import { Crosshair } from "lucide-react";
import { useMap } from "react-leaflet";
import { LatLng } from "./leaflet-map";

const PanToLocationButton = ({
  userLocation,
}: {
  userLocation: LatLng | null;
}) => {
  const map = useMap();

  const panToUserLocation = () => {
    map.setView([userLocation?.lat as number, userLocation?.lng as number]);
  };

  if (!userLocation) return null;

  return (
    <Button
      size="icon"
      className="absolute bottom-20 right-6 rounded-full"
      style={{ zIndex: 1000 }}
      onClick={panToUserLocation}
    >
      <Crosshair />
    </Button>
  );
};

export default PanToLocationButton;
