import prisma from "@/lib/db";

export type TParkingSessionRating = {
  sessionId: string;
  rating: number;
};

export const createParkingSessionRating = async (
  data: TParkingSessionRating
) => {
  await prisma.parkingSessionRating.create({
    data,
  });

  return { ok: true };
};

export const getAllParkingSessionRatings = async () => {
  const ratings = await prisma.parkingSessionRating.findMany();

  return ratings;
};

export const getParkingSessionRatingBySessionId = async (sessionId: string) => {
  const rating = await prisma.parkingSessionRating.findUnique({
    where: {
      sessionId,
    },
  });

  return rating;
};
