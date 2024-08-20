import {
  getCurrentGpoSession,
  getGpoSessionsById,
} from "@/data-access/gpo-sessions";

// GET CURRENT GPO'S SESSION USE CASE
export const getCurrentGpoSessionUseCase = async (accountId: string) => {
  const currentGpoSession = await getCurrentGpoSession(accountId);

  if (!currentGpoSession)
    throw Error(`No current session found for account ID: ${accountId}`);

  return currentGpoSession;
};

// GET ALL THE SESSIONS OF A GPO USE CASE
export const getGpoSessionsByIdUseCase = async (accountId: string) => {
  const gpoSessions = await getGpoSessionsById(accountId);

  return gpoSessions;
};
