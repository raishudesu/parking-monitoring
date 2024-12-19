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
