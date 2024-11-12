import {
  createVisitorCard,
  createVisitorSession,
  deleteVisitorCard,
  getAllVisitorSession,
} from "@/data-access/visitors";

export const createVisitorCardUseCase = async (cardNumber: number) => {
  const card = await createVisitorCard(cardNumber);

  return card;
};

export const deleteVisitorCardUseCase = async (cardId: string) => {
  const res = await deleteVisitorCard(cardId);

  return res;
};

export const createVisitorSessionUseCase = async (cardId: string) => {
  const session = await createVisitorSession(cardId);

  return session;
};

export const getAllVisitorSessionUseCase = async () => {
  const sessions = await getAllVisitorSession();

  return sessions;
};
