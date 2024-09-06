import {
  createGpoSession,
  endGpoSession,
  getAllGpoSessions,
  getOngoingGpoSession,
  getGpoSessionsByGpoId,
} from "@/data-access/gpo-sessions";
import { getParkingSpaceById } from "@/data-access/parking-spaces";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { createGpoViolationUseCase } from "./gpo-violations";
import { addCreditScoreToGpoUseCase } from "./gpo-users";

// CREATE GPO SESSION
export const createGpoSessionUseCase = async (
  parkingSpaceId: string,
  gpoAccountId: string,
  selectedDuration: string
) => {
  // SAMPLE AUTHORIZATION
  const currentSession = await getServerSession(authOptions);

  const isGpo = currentSession?.user.role === "GPO";
  if (!isGpo) throw Error("Unauthorized.");

  const isParkingSessionOngoing = await getOngoingGpoSession(gpoAccountId);
  if (isParkingSessionOngoing)
    throw Error("There is currently an ongoing parking session.");

  const currentParkingSpace = await getParkingSpaceById(parkingSpaceId);
  if (currentParkingSpace?.currCapacity === currentParkingSpace?.maxCapacity)
    throw Error("Current Parking Space is full.");

  // Calculate the end time based on the selected duration
  const now = new Date();
  let shouldEndAt: Date;

  switch (selectedDuration) {
    case "1HOUR":
      now.setHours(now.getHours() + 1);
      break;
    case "2HOURS":
      now.setHours(now.getHours() + 2);
      break;
    case "3HOURS":
      now.setHours(now.getHours() + 3);
      break;
    case "4HOURS":
      now.setHours(now.getHours() + 4);
      break;
    case "5HOURS":
      now.setHours(now.getHours() + 5);
      break;
    case "6HOURS":
      now.setHours(now.getHours() + 6);
      break;
    case "7HOURS":
      now.setHours(now.getHours() + 7);
      break;
    case "8HOURS":
      now.setHours(now.getHours() + 8);
      break;
    default:
      throw Error("Invalid duration selected.");
  }

  // Assign the Date object to shouldEndAt
  shouldEndAt = new Date(now);

  // Create GPO session with Date object
  const createdGpoSession = await createGpoSession(
    parkingSpaceId,
    gpoAccountId,
    shouldEndAt // This is now a Date object
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
export const endGpoSessionUseCase = async (accountId: string) => {
  // GET THE LATEST GPO SESSION FIRST
  const lastGpoSession = await getOngoingGpoSession(accountId);

  if (!lastGpoSession)
    throw Error(`No GPO Session found for accountId: ${accountId}`);

  // CHECK IF THE LATEST SESSION ALREADY ENDED
  if (lastGpoSession?.status === "ENDED")
    throw Error("Last GPO Session has ended.");

  // PUT LOGIC HERE IF ENDED PROPERLY ON TIME
  const endedProperly =
    lastGpoSession.startTime <= (lastGpoSession.shouldEndAt ?? 0);

  const endedGpoSession = await endGpoSession(lastGpoSession.id, endedProperly);

  // APPLY VIOLATION IF DID NOT END ON TIME
  if (!endedProperly) {
    await createGpoViolationUseCase(accountId, "Did not end on time.", 10);
  } else {
    await addCreditScoreToGpoUseCase(accountId);
  }

  return endedGpoSession;
};

// GET ALL GPO SESSIONS FOR ADMIN DASHBOARD
export const getAllGpoSessionsUseCase = async () => {
  const gpoSessions = await getAllGpoSessions();

  return gpoSessions;
};
