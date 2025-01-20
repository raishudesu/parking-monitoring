import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L, { LatLngExpression } from "leaflet";
import "leaflet-routing-machine";

const RoutingComponent = ({
  start,
  end,
}: {
  start: [number, number];
  end: [number, number];
}) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const waypoints: LatLngExpression[] = [start, end];
    const waypointsWithLatLng = waypoints.map((point) => L.latLng(point));

    const routingControl = L.Routing.control({
      waypoints: [L.latLng(start[0], start[1]), L.latLng(end[0], end[1])],
      lineOptions: {
        styles: [{ color: "#2196F3", opacity: 1, weight: 5 }],
        extendToWaypoints: false,
        missingRouteTolerance: 0,
      },
      routeWhileDragging: true,
      show: false,
      addWaypoints: false,
      fitSelectedRoutes: true,
      showAlternatives: true,
      plan: L.routing.plan(waypointsWithLatLng, {
        createMarker: () => false,
      }),
    } as any).addTo(map);

    return () => {
      map.removeControl(routingControl);
    };
  }, [map, start, end]);

  return null;
};

export default RoutingComponent;
