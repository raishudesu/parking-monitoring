import prisma from "@/lib/db";

export const getAllParkingSpaces = async () => {
  const parkingSpaces = await prisma.parkingSpace.findMany();

  return parkingSpaces;
};
