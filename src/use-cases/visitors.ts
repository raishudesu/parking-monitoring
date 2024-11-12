import { createAuditLog } from "@/data-access/audit-log";
import {
  createVisitorCard,
  createVisitorSession,
  deleteVisitorCard,
  getAllVisitorCards,
  getAllVisitorSession,
} from "@/data-access/visitors";

export const createVisitorCardUseCase = async (
  cardNumber: string,
  auditAdminId: string
) => {
  const card = await createVisitorCard(Number(cardNumber));

  await createAuditLog({
    action: "CREATE",
    table: "VISITORPASSCARD",
    adminId: auditAdminId,
  });

  return card;
};

export const getAllVisitorCardsUseCase = async () => {
  const cards = await getAllVisitorCards();

  return cards;
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
