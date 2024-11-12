import { createAuditLog } from "@/data-access/audit-log";
import {
  createVisitorCard,
  createVisitorSession,
  deleteVisitorCard,
  getAllVisitorCards,
  getAllVisitorSession,
  updateVisitorCard,
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

export const updateVisitorCardUseCase = async (
  cardId: string,
  cardNumber: string,
  auditAdminId: string
) => {
  const card = await updateVisitorCard(cardId, Number(cardNumber));

  await createAuditLog({
    action: "UPDATE",
    table: "VISITORPASSCARD",
    adminId: auditAdminId,
  });

  return card;
};

export const deleteVisitorCardUseCase = async (
  cardId: string,
  auditAdminId: string
) => {
  const res = await deleteVisitorCard(cardId);

  await createAuditLog({
    action: "DELETE",
    table: "VISITORPASSCARD",
    adminId: auditAdminId,
  });

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
