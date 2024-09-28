"use client";

import React, { useState, useCallback, useMemo, useEffect } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { ParkingSpace } from "@prisma/client";
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
import { ChevronUp } from "lucide-react";

interface LatLng {
  lat: number;
  lng: number;
}

const center: LatLng = { lat: 9.7787, lng: 118.7341 }; // Default center around IT1
const mapContainerStyle: React.CSSProperties = {
  width: "100%",
  height: "100vh",
};

const DijkstraMap = ({
  parkingSpaces,
}: {
  parkingSpaces: ParkingSpace[];
}): JSX.Element => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: ["places"],
  });

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [userLocation, setUserLocation] = useState<LatLng | null>(null);
  const [closestPoint, setClosestPoint] = useState<LatLng | null>(null);
  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);
  const [selectedParkingSpace, setSelectedParkingSpace] =
    useState<LatLng | null>(null); // Track selected parking space

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  // Real-time location tracking using watchPosition
  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const currentLocation: LatLng = { lat: latitude, lng: longitude };
          setUserLocation(currentLocation);

          // Optionally, center the map on the updated user location
          // if (map) {
          //   map.panTo(currentLocation);
          // }

          // Update directions if a parking space is selected
          if (selectedParkingSpace) {
            calculateRoute(currentLocation, selectedParkingSpace);
          }
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

      // Cleanup watchPosition when component unmounts
      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, [map, selectedParkingSpace]);

  // Find the closest parking space
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
        calculateRoute(userLocation, closest);
      }
    },
    [parkingSpaces]
  );

  // Calculate directions to a destination
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

    // Earth's radius in kilometers
    const R = 6371;
    return R * c;
  };

  // Focus the map on a specific parking space and calculate directions
  const handleParkingSpaceClick = (parkingSpace: {
    longitude: string;
    latitude: string;
  }) => {
    if (map && userLocation) {
      const destination: LatLng = {
        lat: parseFloat(parkingSpace.latitude),
        lng: parseFloat(parkingSpace.longitude),
      };
      setSelectedParkingSpace(destination); // Set the selected parking space
      map.panTo(destination);
      calculateRoute(userLocation, destination); // Calculate the route to the selected parking space
    }

    setDrawerOpen(!drawerOpen);
  };

  const handleShowClosestClick = () => {
    if (userLocation) {
      findClosestPoint(userLocation);
    }
    setDrawerOpen(!drawerOpen);
  };

  const mapOptions = useMemo<google.maps.MapOptions>(
    () => ({
      disableDefaultUI: true,
      clickableIcons: false,
      scrollwheel: true,
      gestureHandling: "auto",
    }),
    []
  );

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <MapLoader />;

  return (
    <div className="relative w-full">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={userLocation || center} // Center map on user location or fallback
        zoom={18}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={mapOptions}
      >
        {parkingSpaces.map(({ id, name, latitude, longitude }, index) => (
          <Marker
            key={index}
            position={{ lat: parseFloat(latitude), lng: parseFloat(longitude) }}
            label={name}
          />
        ))}

        {userLocation && (
          <Marker
            position={userLocation}
            label="You"
            icon="http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
          />
        )}

        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>

      {/* Below the map: List of parking spaces with click handlers */}
      <div className="absolute left-1/2 transform -translate-x-1/2 bottom-20 mt-6 flex flex-col">
        <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
          <DrawerTrigger asChild>
            <Button size={"lg"} className="rounded-full">
              <ChevronUp />
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="mx-auto w-full max-w-sm">
              <DrawerHeader>
                <DrawerTitle>Select Parking Space</DrawerTitle>
                <DrawerDescription>
                  You can also view the nearest parking space.
                </DrawerDescription>
              </DrawerHeader>
              <div className="p-4 pb-0">
                <div className="grid grid-cols-2 gap-3">
                  {parkingSpaces.map(
                    ({
                      id,
                      name,
                      currCapacity,
                      maxCapacity,
                      latitude,
                      longitude,
                    }) => (
                      <div
                        key={id}
                        className="p-3 rounded-xl border cursor-pointer hover:shadow transition-colors ease-in-out"
                        onClick={() =>
                          handleParkingSpaceClick({
                            latitude,
                            longitude,
                          })
                        }
                      >
                        <h2>{name}</h2>
                        {(currCapacity ?? 0) < maxCapacity ? (
                          <small className="text-green-500">Available</small>
                        ) : (
                          <small className="text-red-500">Unavailable</small>
                        )}
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
    </div>
  );
};

export default DijkstraMap;
