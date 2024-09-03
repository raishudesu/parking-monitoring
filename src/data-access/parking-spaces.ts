import prisma from "@/lib/db";
import { parkingSpaceSchema } from "@/lib/zod";
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
