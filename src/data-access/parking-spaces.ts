import prisma from "@/lib/db";

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
