import prisma from "@/lib/db";

export const createVisitorCard = async (cardNumber: number) => {
  const card = await prisma.visitorPassCard.create({
    data: {
      cardNumber,
    },
  });

  return card;
};

export const deleteVisitorCard = async (cardId: string) => {
  await prisma.visitorPassCard.delete({
    where: {
      id: cardId,
    },
  });

  return true;
};

export const createVisitorSession = async (cardId: string) => {
  const visitorSession = await prisma.visitorSession.create({
    data: {
      visitorPassId: cardId,
    },
  });

  return visitorSession;
};

export const getAllVisitorSession = async () => {
  const sessions = await prisma.visitorSession.findMany();

  return sessions;
};
