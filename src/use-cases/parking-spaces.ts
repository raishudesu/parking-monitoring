import {
  createParkingSpace,
  deleteParkingSpaceById,
  getAllParkingSpaces,
  updateParkingSpaceById,
} from "@/data-access/parking-spaces";
import { parkingSpaceSchema } from "@/lib/zod";
import { z } from "zod";

export const createParkingSpaceUseCase = async (
  data: z.infer<typeof parkingSpaceSchema>
) => {
  const parkingSpace = await createParkingSpace(data);

  return parkingSpace;
};

export const getAllParkingSpacesUseCase = async () => {
  const parkingSpaces = await getAllParkingSpaces();

  return parkingSpaces;
};

export const getAvailableSpacesUseCase = async () => {
  const parkingSpaces = await getAllParkingSpaces();

  const availableSpaces = parkingSpaces.filter((space) => {
    if (space.currCapacity) {
      return space.currCapacity < space.maxCapacity;
    }

    return space;
  });

  return availableSpaces;
};

export const getUnavailableSpacesUseCase = async () => {
  const parkingSpaces = await getAllParkingSpaces();

  const unavailableSpaces = parkingSpaces.filter(
    (space) => space.currCapacity === space.maxCapacity
  );

  return unavailableSpaces;
};

export const updateParkingSpaceByIdUseCase = async (
  parkingSpaceId: string,
  data: z.infer<typeof parkingSpaceSchema>
) => {
  const parkingSpace = await updateParkingSpaceById(parkingSpaceId, data);

  if (parkingSpace) return "Parking space updated successfully.";
};

export const deleteParkingSpaceByIdUseCase = async (parkingSpaceId: string) => {
  const parkingSpace = await deleteParkingSpaceById(parkingSpaceId);

  if (parkingSpace) return "Parking space deleted successfully.";
};
