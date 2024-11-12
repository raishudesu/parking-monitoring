import { createAuditLog } from "@/data-access/audit-log";
import {
  createParkingSpace,
  deleteParkingSpaceById,
  getAllParkingSpaces,
  getParkingSpaceCount,
  updateParkingSpaceById,
} from "@/data-access/parking-spaces";
import { parkingSpaceSchema } from "@/lib/zod";
import { z } from "zod";

export const createParkingSpaceUseCase = async (
  data: z.infer<typeof parkingSpaceSchema>
) => {
  const parkingSpaceData = {
    name: data.name,
    description: data.description,
    longitude: data.longitude,
    latitude: data.latitude,
    spaceType: data.spaceType,
    maxCapacity: data.maxCapacity,
    polygon: data.polygon,
  };

  const parkingSpace = await createParkingSpace(parkingSpaceData);

  await createAuditLog({
    action: "CREATE",
    table: "PARKINGSPACE",
    adminId: data.auditAdminId as string,
  });

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
  const parkingSpaceData = {
    name: data.name,
    description: data.description,
    longitude: data.longitude,
    latitude: data.latitude,
    spaceType: data.spaceType,
    maxCapacity: data.maxCapacity,
    polygon: data.polygon,
  };

  const parkingSpace = await updateParkingSpaceById(
    parkingSpaceId,
    parkingSpaceData
  );

  if (parkingSpace) {
    await createAuditLog({
      action: "UPDATE",
      table: "PARKINGSPACE",
      adminId: data.auditAdminId as string,
    });

    return "Parking space updated successfully.";
  }
};

export const deleteParkingSpaceByIdUseCase = async (
  auditAdminId: string,
  parkingSpaceId: string
) => {
  const parkingSpace = await deleteParkingSpaceById(parkingSpaceId);

  await createAuditLog({
    action: "DELETE",
    table: "PARKINGSPACE",
    adminId: auditAdminId,
  });

  if (parkingSpace) return "Parking space deleted successfully.";
};

export const getParkingSpaceCountUseCase = async () => {
  const count = await getParkingSpaceCount();

  return count;
};
