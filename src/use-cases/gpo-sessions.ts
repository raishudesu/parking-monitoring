import {
  createGpoSession,
  endGpoSession,
  getAllGpoSessions,
  getOngoingGpoSession,
  getGpoSessionsByGpoId,
  getRecentSessions,
  getSessionsForAnalysis,
  createGpoSessionByPriority,
  endGpoSessionByPriority,
  getGpoSessionsData,
} from "@/data-access/gpo-sessions";
import { getParkingSpaceById } from "@/data-access/parking-spaces";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { createGpoViolationUseCase } from "./gpo-violations";
import { addCreditScoreToGpoUseCase } from "./gpo-users";
import {
  deactivateGpoAccount,
  getUserPrioritiesById,
} from "@/data-access/gpo-users";
import { SessionStatus } from "@prisma/client";

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

  const userPriorities = await getUserPrioritiesById(gpoAccountId);

  const isReservedCapacityFull =
    currentParkingSpace?.currReservedCapacity! >=
    currentParkingSpace?.reservedCapacity!;

  console.log(userPriorities, isReservedCapacityFull);

  // check if user is vip or pwd to use the reserved slot
  // if user is vip or pwd but the reserved space is full, they will just use the normal slots if not full

  const priorityValidated =
    (userPriorities?.isPWD || userPriorities?.isVIP) && !isReservedCapacityFull;

  console.log(priorityValidated);

  if (priorityValidated) {
    const createdGpoSessionByPriority = await createGpoSessionByPriority(
      parkingSpaceId,
      gpoAccountId,
      shouldEndAt // This is now a Date object
    );

    return createdGpoSessionByPriority;
  }

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

export const getGpoSessionsDataUseCase = async (accountId: string) => {
  const sessions = await getGpoSessionsData(accountId);
  return sessions;
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
  const now = new Date();

  const endedProperly = now < (lastGpoSession.shouldEndAt ?? 0);

  // APPLY VIOLATION IF DID NOT END ON TIME
  if (!endedProperly) {
    const { GatePassOwner } = await createGpoViolationUseCase(
      accountId,
      "Did not end on time.",
      10
    );
    // console.log(GatePassOwner);
    if (GatePassOwner) {
      if ((GatePassOwner.creditScore as number) <= 60) {
        await deactivateGpoAccount(accountId);
      }
    }
  } else {
    await addCreditScoreToGpoUseCase(accountId);
  }

  const userPriorities = await getUserPrioritiesById(accountId);

  // check if user is vip or pwd
  if (userPriorities?.isPWD || userPriorities?.isVIP) {
    const endedGpoSessionByPriority = await endGpoSessionByPriority(
      lastGpoSession.id,
      endedProperly
    );

    return endedGpoSessionByPriority;
  }

  const endedGpoSession = await endGpoSession(lastGpoSession.id, endedProperly);

  return endedGpoSession;
};

// GET ALL GPO SESSIONS FOR ADMIN DASHBOARD
export const getAllGpoSessionsUseCase = async ({
  page = 1,
  limit = 10,
  emailFilter = "",
  statusFilter = undefined,
}: {
  page?: number;
  limit?: number;
  emailFilter?: string;
  lastNameFilter?: string;
  statusFilter?: SessionStatus;
}) => {
  const skip = (page - 1) * limit;

  const { sessions, totalCount } = await getAllGpoSessions({
    skip,
    take: limit,
    emailFilter,
    statusFilter,
  });

  const pageCount = Math.ceil(totalCount / limit);

  return { data: sessions, totalCount, pageCount };
};

export const getRecentSessionsUseCase = async () => {
  const sessions = await getRecentSessions();

  return sessions;
};

export const getSessionsForAnalysisUseCase = async () => {
  const sessions = await getSessionsForAnalysis();

  return sessions;
};
