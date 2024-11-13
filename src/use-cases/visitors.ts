import { createAuditLog } from "@/data-access/audit-log";
import { getOngoingGpoSession } from "@/data-access/gpo-sessions";
import {
  createVisitorCard,
  createVisitorSession,
  deleteVisitorCard,
  endVisitorSession,
  getAllVisitorCards,
  getAllVisitorSession,
  getOngoingVisitorSession,
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
  // include func checker if theres ongoing session via cardId
  const currentSession = await getOngoingVisitorSession(cardId);

  if (currentSession)
    throw new Error("There is an ongoing session with this card.");

  const session = await createVisitorSession(cardId);

  return session;
};

export const getOngoingVisitorSessionUseCase = async (cardId: string) => {
  const session = await getOngoingVisitorSession(cardId);

  return session;
};

export const endVisitorSessionUseCase = async (cardId: string) => {
  // check current session first to get its ID
  const currentSession = await getOngoingVisitorSession(cardId);

  if (!currentSession)
    throw new Error("There is no session ongoing with this card.");

  const session = await endVisitorSession(currentSession.id);

  return session;
};

export const getAllVisitorSessionUseCase = async () => {
  const sessions = await getAllVisitorSession();

  return sessions;
};
