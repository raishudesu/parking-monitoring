import prisma from "@/lib/db";
import { parkingSpaceSchema } from "@/lib/zod";
import { ParkingSpace } from "@prisma/client";
import { z } from "zod";

export const createParkingSpace = async (
  data: z.infer<typeof parkingSpaceSchema>
) => {
  const parkingSpace = await prisma.parkingSpace.create({
    data,
  });

  return parkingSpace;
};

export const getAllParkingSpaces = async () => {
  const parkingSpaces = await prisma.parkingSpace.findMany();

  return parkingSpaces;
};

export const getParkingSpaceById = async (parkingSpaceId: string) => {
  const parkingSpace = await prisma.parkingSpace.findUnique({
    where: {
      id: parkingSpaceId,
    },
  });

  return parkingSpace;
};

export const updateParkingSpaceById = async (
  parkingSpaceId: string,
  data: z.infer<typeof parkingSpaceSchema>
) => {
  const parkingSpace = await prisma.parkingSpace.update({
    where: {
      id: parkingSpaceId,
    },
    data,
  });

  return parkingSpace;
};

export const deleteParkingSpaceById = async (parkingSpaceId: string) => {
  const parkingSpace = await prisma.parkingSpace.delete({
    where: {
      id: parkingSpaceId,
    },
  });

  return parkingSpace;
};

export const getParkingSpaceCount = async () => {
  const count = await prisma.parkingSpace.count();

  return count;
};
