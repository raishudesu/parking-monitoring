"use client";

import React, {
  Dispatch,
  Fragment,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  DirectionsRenderer,
  GoogleMap,
  Marker,
  useJsApiLoader,
  Polygon,
  InfoWindow,
} from "@react-google-maps/api";
import { ParkingSpace, ParkingSpaceImage } from "@prisma/client";
import { Button } from "@/components/ui/button";
import MapLoader from "./map-loader";
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
import { ChevronUp, Crosshair } from "lucide-react";
import PanellumViewerDialog from "./panellum-viewer-dialog";
import { useSession } from "next-auth/react";

interface LatLng {
  lat: number;
  lng: number;
}

const center: LatLng = { lat: 9.7787, lng: 118.7341 };
const mapContainerStyle: React.CSSProperties = {
  width: "100%",
  height: "100vh",
};

const unavailableMarkerSvg = `data:image/svg+xml;base64,${btoa(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36" fill="red">
    <path d="M12 0C7.58 0 4 3.58 4 8c0 5.25 8 13 8 13s8-7.75 8-13c0-4.42-3.58-8-8-8zm0 11c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/>
  </svg>
`)}`;

const availableMarkerSvg = `data:image/svg+xml;base64,${btoa(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36" fill="green">
    <path d="M12 0C7.58 0 4 3.58 4 8c0 5.25 8 13 8 13s8-7.75 8-13c0-4.42-3.58-8-8-8zm0 11c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/>
  </svg>
`)}`;

const userLocationSvg = `data:image/svg+xml;base64,${btoa(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
    <circle cx="12" cy="12" r="8" fill="#4285F4" stroke="white" stroke-width="2"/>
  </svg>
`)}`;

export type ParkingSpaceWithImages = ParkingSpace & {
  images: ParkingSpaceImage[];
};

export type PannellumProps = {
  parkingName: string;
  images: ParkingSpaceImage[] | undefined;
};

const DijkstraMap = ({
  parkingSpaces,
}: {
  parkingSpaces: ParkingSpaceWithImages[];
}) => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: ["places"],
  });

  const session = useSession();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [userLocation, setUserLocation] = useState<LatLng | null>(null);
  const [closestPoint, setClosestPoint] = useState<LatLng | null>(null);
  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);
  const [selectedParkingSpace, setSelectedParkingSpace] =
    useState<LatLng | null>(null);
  const [selectedParkingSpaceData, setSelectedParkingSpaceData] =
    useState<PannellumProps | null>(null);

  const mapRef = useRef<google.maps.Map | null>(null);

  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    mapRef.current = null;
    setMap(null);
  }, []);

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

      if (selectedParkingSpace) {
        calculateRoute(userLocation as LatLng, selectedParkingSpace);
      }

      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, [selectedParkingSpace]);

  const calculateDistance = (point1: LatLng, point2: LatLng): number => {
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

  const findClosestPoint = useCallback(
    (userLocation: LatLng) => {
      let minDistance = Infinity;
      let closest = null;

      for (const point of parkingSpaces) {
        const distance = calculateDistance(userLocation, {
          lat: parseFloat(point.latitude),
          lng: parseFloat(point.longitude),
        });
        if (distance < minDistance) {
          minDistance = distance;
          closest = {
            lat: parseFloat(point.latitude),
            lng: parseFloat(point.longitude),
          };
        }
      }

      if (closest) {
        setClosestPoint(closest);
        setSelectedParkingSpace(closest);
        calculateRoute(userLocation, closest);
        if (mapRef.current) {
          mapRef.current.panTo(closest);
        }
      }
    },
    [parkingSpaces]
  );

  const calculateRoute = useCallback((origin: LatLng, destination: LatLng) => {
    if (!origin || !destination) return;

    const directionsService = new google.maps.DirectionsService();
    directionsService.route(
      {
        origin,
        destination,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK && result) {
          setDirections(result);
        } else {
          console.error(`Error fetching directions: ${status}`);
        }
      }
    );
  }, []);

  const handleParkingSpaceClick = (parkingSpace: {
    longitude: string;
    latitude: string;
  }) => {
    if (mapRef.current) {
      const destination: LatLng = {
        lat: parseFloat(parkingSpace.latitude),
        lng: parseFloat(parkingSpace.longitude),
      };
      setSelectedParkingSpace(destination);
      mapRef.current.panTo(destination);
      if (userLocation) {
        calculateRoute(userLocation, destination);
      }
    }
    setDrawerOpen(false);
  };

  const handleShowClosestClick = () => {
    if (userLocation) {
      findClosestPoint(userLocation);
    }
    setDrawerOpen(false);
  };

  const handleCenterOnUser = () => {
    if (mapRef.current && userLocation) {
      mapRef.current.panTo(userLocation);
    }
  };

  const isSelected = (latitude: string, longitude: string): boolean => {
    if (!selectedParkingSpace) return false;
    return (
      selectedParkingSpace.lat === parseFloat(latitude) &&
      selectedParkingSpace.lng === parseFloat(longitude)
    );
  };

  const isAvailable = (currCapacity: number, maxCapacity: number) => {
    if (currCapacity < maxCapacity)
      return { value: true, icon: availableMarkerSvg };

    return { value: false, icon: unavailableMarkerSvg };
  };

  const mapOptions = useMemo<google.maps.MapOptions>(
    () => ({
      disableDefaultUI: true,
      clickableIcons: false,
      scrollwheel: true,
      gestureHandling: "greedy",
    }),
    []
  );

  const parsePolygonCoordinates = (polygonString?: string) => {
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

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <MapLoader />;

  function calculatePolygonCenter(paths: google.maps.LatLngLiteral[]) {
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

  return (
    <div className="relative w-full h-screen">
      <PanellumViewerDialog
        parkingName={selectedParkingSpaceData?.parkingName || ""}
        images={selectedParkingSpaceData?.images}
        open={selectedParkingSpaceData !== null}
        setOpen={(value) =>
          setSelectedParkingSpaceData(value ? selectedParkingSpaceData : null)
        }
      />
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={18}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={mapOptions}
      >
        {parkingSpaces.map(
          ({
            id,
            name,
            latitude,
            longitude,
            currCapacity,
            maxCapacity,
            polygon,
            images,
            spaceType,
          }) => (
            <Fragment key={id}>
              <Marker
                position={{
                  lat: parseFloat(latitude),
                  lng: parseFloat(longitude),
                }}
                onClick={() =>
                  setSelectedParkingSpaceData({ parkingName: name, images })
                }
                icon={{
                  url: isAvailable(currCapacity as number, maxCapacity).icon,
                  // scaledSize: isSelected(latitude, longitude)
                  //     ? new google.maps.Size(42, 42)
                  //     : new google.maps.Size(24, 24),
                  anchor: new google.maps.Point(
                    isSelected(latitude, longitude) ? 18 : 12,
                    isSelected(latitude, longitude) ? 36 : 24
                  ),
                }}
                label={{
                  text: `${spaceType}: ${name} `,
                  // fontSize: isSelected(latitude, longitude) ? "14px" : "12px",
                  fontWeight: isSelected(latitude, longitude)
                    ? "bold"
                    : "normal",
                  className: `marker-label mt-16 rounded-xl p-2 border ${
                    isAvailable(currCapacity as number, maxCapacity).value
                      ? "bg-green-500"
                      : "bg-destructive"
                  }`,
                }}
              />
              {polygon && (
                <>
                  <Polygon
                    paths={parsePolygonCoordinates(polygon)}
                    options={{
                      fillColor: isAvailable(
                        currCapacity as number,
                        maxCapacity
                      ).value
                        ? "#4ade80"
                        : "#ef4444",
                      fillOpacity: 0.3,
                      strokeColor: isSelected(latitude, longitude)
                        ? "#3b82f6"
                        : "#6b7280",
                      strokeWeight: isSelected(latitude, longitude) ? 2 : 1,
                    }}
                  />
                  {/* <Marker
                    position={calculatePolygonCenter(
                      parsePolygonCoordinates(polygon)
                    )}
                    label={{
                      text: name,
                      color: "black",
                      fontWeight: "bold",
                    }}
                  /> */}
                </>
              )}
            </Fragment>
          )
        )}

        {userLocation && (
          <Marker
            position={userLocation}
            icon={{
              url: userLocationSvg,
              scaledSize: new google.maps.Size(24, 24),
              anchor: new google.maps.Point(12, 12),
            }}
          />
        )}

        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>

      <Button
        size="icon"
        className="absolute bottom-20 right-6 rounded-full"
        onClick={handleCenterOnUser}
      >
        <Crosshair />
      </Button>

      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
        <DrawerTrigger asChild>
          <Button
            size="lg"
            className="absolute bottom-20 left-1/2 transform -translate-x-1/2 rounded-full"
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
                  }) => (
                    <div
                      key={id}
                      className={`p-3 rounded-xl border cursor-pointer hover:shadow transition-colors ease-in-out ${
                        isSelected(latitude, longitude)
                          ? "border-blue-500 bg-blue-50 dark:bg-blue-900 dark:border-blue-700"
                          : ""
                      }`}
                      onClick={() =>
                        handleParkingSpaceClick({
                          latitude,
                          longitude,
                        })
                      }
                    >
                      <h2>{name}</h2>
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
                <Button className="mt-6" onClick={handleShowClosestClick}>
                  Show closest parking space
                </Button>
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

export default DijkstraMap;
