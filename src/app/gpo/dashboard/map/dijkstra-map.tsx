"use client";

import React, { useState, useCallback, useMemo, useEffect } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";

interface LatLng {
  lat: number;
  lng: number;
}

const center: LatLng = { lat: 9.7787, lng: 118.7341 }; // Center map around IT1
const mapContainerStyle: React.CSSProperties = {
  width: "100%",
  height: "80vh",
};

function DijkstraMap(): JSX.Element {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: ["places"],
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [userLocation, setUserLocation] = useState<LatLng | null>(null);
  const [closestPoint, setClosestPoint] = useState<LatLng | null>(null);
  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);

  // Predefined parking spaces with labels
  const parkingSpaces: { location: LatLng; label: string }[] = [
    { location: { lat: 9.7787, lng: 118.7341 }, label: "IT1" }, // IT1
    { location: { lat: 9.778333, lng: 118.734556 }, label: "CS1" }, // CS1
  ];

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  // Use the Geolocation API to get the user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const currentLocation: LatLng = { lat: latitude, lng: longitude };
          setUserLocation(currentLocation);
          findClosestPoint(currentLocation);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  }, []);

  // Find the closest parking space and calculate directions
  const findClosestPoint = useCallback(
    (userLocation: LatLng) => {
      let minDistance = Infinity;
      let closest = null;

      // Find the closest parking space using distance calculation
      for (const point of parkingSpaces) {
        const distance = calculateDistance(userLocation, point.location);
        if (distance < minDistance) {
          minDistance = distance;
          closest = point.location;
        }
      }

      if (closest) {
        setClosestPoint(closest);
        calculateRoute(userLocation, closest);
      }
    },
    [parkingSpaces]
  );

  // Calculate driving or walking directions
  const calculateRoute = useCallback((origin: LatLng, destination: LatLng) => {
    if (!origin || !destination) return;

    const directionsService = new google.maps.DirectionsService();
    directionsService.route(
      {
        origin,
        destination,
        travelMode: google.maps.TravelMode.DRIVING, // You can change this to WALKING if preferred
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

  const mapOptions = useMemo<google.maps.MapOptions>(
    () => ({
      disableDefaultUI: true,
      clickableIcons: false,
      scrollwheel: true, // Allow zooming with scroll wheel
      gestureHandling: "auto", // Enable gesture-based zooming
    }),
    []
  );

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading maps</div>;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={userLocation || center} // Center map on user location or fallback
      zoom={18}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={mapOptions}
    >
      {/* Show markers for parking locations with labels */}
      {parkingSpaces.map((marker, index) => (
        <Marker key={index} position={marker.location} label={marker.label} />
      ))}
      {/* Show marker for user location with label */}
      {userLocation && (
        <Marker
          position={userLocation}
          label="You"
          icon="http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
        />
      )}
      {/* Render directions if calculated */}
      {directions && <DirectionsRenderer directions={directions} />}
    </GoogleMap>
  );
}

export default DijkstraMap;
