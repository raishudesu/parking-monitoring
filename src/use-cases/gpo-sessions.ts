import {
  createGpoSession,
  endGpoSession,
  getAllGpoSessions,
  getOngoingGpoSession,
  getGpoSessionsByGpoId,
} from "@/data-access/gpo-sessions";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

// CREATE/START A GPO SESSION
export const createGpoSessionUseCase = async (
  parkingSpaceId: string,
  gpoAccountId: string
) => {
  //SAMPLE AUTHORIZATION
  const currentSession = await getServerSession(authOptions);

  const isGpo = currentSession?.user.role === "GPO";

  if (!isGpo) throw Error("Unauthorized.");

  const isParkingSessionOngoing = await getOngoingGpoSession(gpoAccountId);

  console.log(isParkingSessionOngoing);

  if (isParkingSessionOngoing)
    throw Error("There is currently an ongoing parking session.");

  const createdGpoSession = await createGpoSession(
    parkingSpaceId,
    gpoAccountId
  );

  return createdGpoSession;
};

// GET CURRENT GPO'S SESSION USE CASE
export const getCurrentGpoSessionUseCase = async (accountId: string) => {
  const currentGpoSession = await getOngoingGpoSession(accountId);

  if (!currentGpoSession)
    throw Error(`No current session found for account ID: ${accountId}`);

  return currentGpoSession;
};

// GET ALL THE SESSIONS OF A GPO USE CASE
export const getGpoSessionsByIdUseCase = async (accountId: string) => {
  const gpoSessions = await getGpoSessionsByGpoId(accountId);

  return gpoSessions;
};

// END CURRENT GPO SESSION USE CASE
export const endGpoSessionUseCase = async (
  accountId: string,
  endedProperly: boolean
) => {
  // GET THE LATEST GPO SESSION FIRST
  const lastGpoSession = await getOngoingGpoSession(accountId);

  if (!lastGpoSession)
    throw Error(`No GPO Session found for accountId: ${accountId}`);

  // CHECK IF THE LATEST SESSION ALREADY ENDED
  if (lastGpoSession?.status === "ENDED")
    throw Error("Last GPO Session has ended.");

  const endedGpoSession = await endGpoSession(
    lastGpoSession.accountId,
    endedProperly
  );

  return endedGpoSession;
};

// GET ALL GPO SESSIONS FOR ADMIN DASHBOARD
export const getAllGpoSessionsUseCase = async () => {
  const gpoSessions = await getAllGpoSessions();

  return gpoSessions;
};
