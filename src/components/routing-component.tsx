import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import L, { LatLngExpression, Routing } from "leaflet";
import "leaflet-routing-machine";

interface RoutingComponentProps {
  start: [number, number];
  end: [number, number];
  fitBounds?: boolean; // Optional prop to control auto-fitting behavior
}

const RoutingComponent: React.FC<RoutingComponentProps> = ({
  start,
  end,
  fitBounds = false, // Default to false to prevent automatic panning
}) => {
  const map = useMap();
  const routingControlRef = useRef<L.Routing.Control | null>(null);

  useEffect(() => {
    if (!map) return;

    // If we already have a routing control, just update the waypoints
    if (routingControlRef.current) {
      const waypoints = [
        L.latLng(start[0], start[1]),
        L.latLng(end[0], end[1]),
      ];

      routingControlRef.current.setWaypoints(waypoints);
      return;
    }

    // Initial creation of routing control
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
      fitSelectedRoutes: fitBounds, // Use the prop to control fitting behavior
      showAlternatives: true,
      plan: L.Routing.plan([], {
        // Empty initial waypoints
        createMarker: () => false,
      }),
    }).addTo(map);

    // Store the control in the ref
    routingControlRef.current = routingControl;

    // Cleanup function
    return () => {
      if (routingControlRef.current) {
        map.removeControl(routingControlRef.current);
        routingControlRef.current = null;
      }
    };
  }, [map]); // Only recreate when map changes

  // Separate effect for updating waypoints
  useEffect(() => {
    if (!routingControlRef.current) return;

    const waypoints = [L.latLng(start[0], start[1]), L.latLng(end[0], end[1])];

    routingControlRef.current.setWaypoints(waypoints);
  }, [start, end]);

  return null;
};

export default RoutingComponent;
