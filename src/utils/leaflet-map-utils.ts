import { LatLng } from "@/components/leaflet-map";
import { LatLngLiteral } from "leaflet";

// GET THE CENTER OF A POLYGON FOR MARKER PLACEMENT
export function calculatePolygonCenter(paths: LatLngLiteral[]): LatLngLiteral {
  let totalLat = 0;
  let totalLng = 0;

  paths.forEach((point) => {
    totalLat += point.lat;
    totalLng += point.lng;
  });

  return {
    lat: totalLat / paths.length,
    lng: totalLng / paths.length,
  };
}

// PARSE POLYGON COORDINATES FROM STRING
export const parsePolygonCoordinates = (polygonString?: string) => {
  if (!polygonString) return [];

  try {
    // Assuming the polygonString is in the format: "[{lat: number, lng: number}, ...]"
    const coordinates = JSON.parse(polygonString);
    return coordinates.map((coord: { lat: number; lng: number }) => ({
      lat: parseFloat(coord.lat.toString()),
      lng: parseFloat(coord.lng.toString()),
    }));
  } catch (error) {
    console.error("Error parsing polygon coordinates:", error);
    return [];
  }
};

export const calculateDistance = (point1: LatLng, point2: LatLng): number => {
  const lat1 = (point1.lat * Math.PI) / 180;
  const lat2 = (point2.lat * Math.PI) / 180;
  const lng1 = (point1.lng * Math.PI) / 180;
  const lng2 = (point2.lng * Math.PI) / 180;

  const dlat = lat2 - lat1;
  const dlng = lng2 - lng1;

  const a =
    Math.sin(dlat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dlng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const R = 6371;
  return R * c;
};
