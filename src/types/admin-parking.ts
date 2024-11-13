import { parkingSpaceFormSchema } from "@/lib/zod";
import { z } from "zod";

// Types for MapPicker component
export interface MapPickerProps {
  onLocationPicked: (lat: number, lng: number) => void;
  isLoaded: any;
}

export interface MarkerPosition {
  lat: number;
  lng: number;
}

// Types for ParkingSpaceCreationForm component
export type ParkingSpaceFormSchemaType = z.infer<typeof parkingSpaceFormSchema>;

export interface ParkingSpaceFormProps {
  // Add any props if needed for the form component
}

// Assuming you have these types defined in your zod schema
export type SpaceType =
  | "MOTORCYCLE"
  | "TRICYCLE"
  | "FOURWHEEL"
  | "HYBRID"
  | "PWD"
  | "VIP";

export interface ParkingSpaceSchema {
  name: string;
  description: string;
  longitude: string;
  latitude: string;
  spaceType: SpaceType;
  maxCapacity: number;
  imageUrl?: string;
  auditAdminId: string;
}

// If you need to extend the parkingSpaceSchema for the form
export type ParkingSpaceFormSchema = Omit<
  ParkingSpaceSchema,
  "maxCapacity" | "auditAdminId"
> & {
  maxCapacity: string; // As a string in the form, parsed to number on submit
};
