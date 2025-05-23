import prisma from "@/lib/db";
import { parkingSpaceSchema } from "@/lib/zod";
import { ParkingSpace, ParkingSpaceType } from "@prisma/client";
import { z } from "zod";

export const createParkingSpace = async (
  data: z.infer<typeof parkingSpaceSchema>
) => {
  const { images, ...parkingSpaceData } = data;
  const parkingSpace = await prisma.parkingSpace.create({
    data: {
      ...parkingSpaceData,
      images: {
        create: images.map((image) => ({
          url: image.url,
          path: image.path,
        })),
      },
    },
  });

  return parkingSpace;
};

export const getAllParkingSpacesForGpo = async () => {
  const parkingSpaces = await prisma.parkingSpace.findMany({
    include: {
      images: true,
    },
  });

  return parkingSpaces;
};

export const getAllParkingSpaces = async ({
  skip = 0,
  take = 10,
  nameFilter = "",
  spaceTypeFilter = undefined,
}: {
  skip?: number;
  take?: number;
  nameFilter?: string;
  spaceTypeFilter?: ParkingSpaceType;
}) => {
  const where = {
    ...(nameFilter && {
      name: {
        contains: nameFilter,
      },
    }),
    ...(spaceTypeFilter && {
      spaceType: {
        equals: spaceTypeFilter,
      },
    }),
  };

  const [parkingSpaces, totalCount] = await Promise.all([
    prisma.parkingSpace.findMany({
      where,
      skip,
      take,
      include: {
        images: true,
      },
    }),
    prisma.parkingSpace.count({
      where,
    }),
  ]);

  return { parkingSpaces, totalCount };
};

export const getParkingSpaceOptions = async () => {
  const options = await prisma.parkingSpace.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  return options;
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
  const { images, ...parkingSpaceData } = data;
  const parkingSpace = await prisma.parkingSpace.update({
    where: {
      id: parkingSpaceId,
    },
    data: {
      ...parkingSpaceData,
    },
  });

  await prisma.parkingSpaceImage.deleteMany({
    where: {
      parkingSpaceId,
    },
  });

  await prisma.parkingSpaceImage.createMany({
    data: images.map((image) => ({
      url: image.url,
      path: image.path,
      type: image.type,
      parkingSpaceId,
    })),
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
