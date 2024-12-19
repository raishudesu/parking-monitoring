import { ParkingSpace, ParkingSpaceImage } from "@prisma/client";

export type LatLngLiteral = {
  lat: number;
  lng: number;
};

export type ParkingSpaceWithImages = ParkingSpace & {
  images: ParkingSpaceImage[];
};

export type PannellumProps = {
  parkingName: string;
  images: ParkingSpaceImage[] | undefined;
};
