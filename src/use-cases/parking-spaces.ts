import { createAdminLog } from "@/data-access/admin-log";
import {
  createParkingSpace,
  deleteParkingSpaceById,
  getAllParkingSpaces,
  getParkingSpaceCount,
  getParkingSpaceOptions,
  updateParkingSpaceById,
} from "@/data-access/parking-spaces";
import { parkingSpaceSchema } from "@/lib/zod";
import { ParkingSpaceType } from "@prisma/client";
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
    reservedCapacity: data.reservedCapacity,
    polygon: data.polygon,
    images: data.images,
  };

  const parkingSpace = await createParkingSpace(parkingSpaceData);

  await createAdminLog({
    action: "CREATE",
    table: "PARKINGSPACE",
    adminId: data.auditAdminId as string,
  });

  return parkingSpace;
};

export const getParkingSpaceOptionsUseCase = async () => {
  const options = await getParkingSpaceOptions();

  return options;
};

export const getAllParkingSpacesUseCase = async ({
  page = 1,
  limit = 10,
  nameFilter = "",
  spaceTypeFilter = undefined,
}: {
  page?: number;
  limit?: number;
  nameFilter?: string;
  spaceTypeFilter?: ParkingSpaceType;
}) => {
  const skip = (page - 1) * limit;

  const { parkingSpaces, totalCount } = await getAllParkingSpaces({
    skip,
    take: limit,
    nameFilter,
    spaceTypeFilter,
  });

  const pageCount = Math.ceil(totalCount / limit);

  return { data: parkingSpaces, totalCount, pageCount };
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
    reservedCapacity: data.reservedCapacity,
    polygon: data.polygon,
    images: data.images,
  };

  const parkingSpace = await updateParkingSpaceById(
    parkingSpaceId,
    parkingSpaceData
  );

  if (parkingSpace) {
    await createAdminLog({
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

  await createAdminLog({
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
