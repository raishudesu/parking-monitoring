import { compare, hash } from "bcrypt";
import {
  addCreditScoreToGpo,
  createGpoAccount,
  deactivateGpoAccount,
  getActiveGpoCount,
  getAllGpoAccounts,
  getCreditScore,
  getCurrentGpoSessionByGpoId,
  getGpoByEmail,
  getGpoById,
  getGpoCount,
  reactivateGpoAccount,
  updateGpoAccount,
  updateGpoCreditScore,
  updateGpoPassword,
} from "../data-access/gpo-users";
import { InvalidEmailError, LoginError } from "./errors";
import { z } from "zod";
import { accountCreationSchema, gpoAccountSchema } from "@/lib/zod";
import { createAdminLog } from "@/data-access/admin-log";
import { GPOAccount } from "@prisma/client";
import { TPasswordResetData } from "@/types/password-reset-token";
import {
  findPasswordResetToken,
  invalidatePasswordResetToken,
} from "@/data-access/password-reset-token";

// USE CASE FOR GPO LOG IN
export const gpoLoginUseCase = async (
  email: string,
  plainTextPassword: string
) => {
  const gpo = await getGpoByEmail(email);

  if (!gpo) {
    throw new LoginError();
  }

  const passwordMatched = await compare(plainTextPassword, gpo.password);

  if (!passwordMatched) throw new LoginError();

  const { password: newUserPassword, ...sanitizedGpo } = gpo; // DTO to exclude the password property upon sending the user details back

  return sanitizedGpo;
};

export const getGpoByIdUseCase = async (accountId: string) => {
  const gpo = await getGpoById(accountId);

  const { password: _password, ...filteredGpo } = gpo as {
    password: string;
  } & typeof gpo;

  return filteredGpo;
};

// GET ALL GPO ACCOUNTS
export const getAllGpoAccountsUseCase = async () => {
  const gpoAccounts = await getAllGpoAccounts();

  return gpoAccounts;
};

// GPO ACCOUNT CREATION USE CASE
export const createGpoAccountUseCase = async (
  auditAdminId: string,
  data: z.infer<typeof accountCreationSchema>
) => {
  // VALIDATE THE DATA FIRST
  const validatedData = gpoAccountSchema.parse(data);

  // HASH THE PASSWORD
  const hashedPwd = await hash(validatedData.password as string, 10);

  validatedData.password = hashedPwd;

  // if (validatedData.collegeId === null) {
  //   validatedData.collegeId = null;
  // }

  const gpo = await createGpoAccount(validatedData);

  if (!gpo) throw Error("Creating an GPO Account failed.");

  // FILTER OUT THE PASSWORD PROPERTY FROM THE RETURNED OBJECT
  const { password: newGpoPassword, ...filteredGpoAccount } = gpo;

  await createAdminLog({
    action: "CREATE",
    table: "ACCOUNT",
    adminId: auditAdminId,
  });

  return filteredGpoAccount;
};

// GPO ACCOUNT UPDATE USE CASE
export const updateGpoAccountUseCase = async (
  auditAdminId: string,
  accountId: string,
  data: z.infer<typeof gpoAccountSchema>
) => {
  const gpo = await updateGpoAccount(accountId, data);

  if (!gpo)
    throw Error(`Updating GPO Account with Account ID: ${accountId} failed.`);

  await createAdminLog({
    action: "UPDATE",
    table: "ACCOUNT",
    adminId: auditAdminId,
  });

  return gpo;
};

// DEACTIVATE GPO ACCOUNT USE CASE
export const deactivateGpoAccountUseCase = async (
  auditAdminId: string | undefined,
  accountId: string
) => {
  const gpo = await getGpoById(accountId);

  if (!gpo) throw Error(`No GPO Account found with account ID: ${accountId}`);

  const deactivatedGpo = await deactivateGpoAccount(accountId);

  if (deactivatedGpo) {
    if (auditAdminId) {
      await createAdminLog({
        action: "DEACTIVATE",
        table: "ACCOUNT",
        adminId: auditAdminId,
      });
    }

    return "Account Deactivated Successfully.";
  }
};

// REACTIVATE GPO ACCOUNT USE CASE
export const reactivateGpoAccountUseCase = async (
  auditAdminId: string,
  accountId: string
) => {
  const gpo = await getGpoById(accountId);

  if (!gpo) throw Error(`No GPO Account found with account ID: ${accountId}`);

  const reactivatedGpo = await reactivateGpoAccount(accountId);

  if (reactivatedGpo) {
    await createAdminLog({
      action: "REACTIVATE",
      table: "ACCOUNT",
      adminId: auditAdminId,
    });

    return "Account Reactivated Successfully.";
  }
};

export const getCurrentGpoSessionUseCase = async (gpoAccountId: string) => {
  const currentSession = await getCurrentGpoSessionByGpoId(gpoAccountId);

  return currentSession;
};

// UPDATE GPO PASSWORD
export const updateGpoPasswordUseCase = async (
  gpoAccountId: string,
  newPassword: string,
  oldPassword: string
) => {
  const currentGpo = await getGpoById(gpoAccountId);

  if (!currentGpo) throw Error("GPO Account does not exist.");

  const passwordMatched = await compare(oldPassword, currentGpo.password);

  if (!passwordMatched)
    throw Error("Old password does not match current password.");

  const hashedPwd = await hash(newPassword, 10);

  const data = await updateGpoPassword(gpoAccountId, hashedPwd);

  const { password: filteredPassword, ...filteredGpoAccount } = data.gpo;

  return filteredGpoAccount;
};

// add credit score to gpo upon proper ending session
export const addCreditScoreToGpoUseCase = async (accountId: string) => {
  const gpo = await getGpoById(accountId);

  let creditToAdd = 0;

  if (!gpo) throw Error("GPO Account doesn't exist.");

  if ((gpo.creditScore ?? 0) < 100) {
    creditToAdd = 5;
  }

  const updatedGpo = await addCreditScoreToGpo(accountId, creditToAdd);

  const { password: omittedPwd, ...filteredGpo } = updatedGpo;

  return filteredGpo;
};

export const updateGpoCreditScoreUseCase = async (
  userId: string,
  creditScore: number,
  adminId: string
) => {
  const res = await updateGpoCreditScore(userId, creditScore);

  await createAdminLog({
    action: "UPDATE",
    table: "ACCOUNT",
    adminId,
  });

  return res;
};

export const getGpoCountUseCase = async () => {
  const count = await getGpoCount();

  return count;
};

export const getActiveGpoCountUseCase = async () => {
  const count = await getActiveGpoCount();

  return count;
};

export const getCreditsScoreUseCase = async (accountId: string) => {
  const gpoCreditScore = await getCreditScore(accountId);

  return gpoCreditScore;
};

export const resetUserPassword = async (data: TPasswordResetData) => {
  const tokenExists = await findPasswordResetToken(data.token, data.email);

  if (!tokenExists) throw Error("Invalid or expired token.");

  const user = await getGpoByEmail(data.email);

  if (!user) throw new InvalidEmailError();

  const hashedPassword = await hash(data.newPassword, 10);

  const res = await updateGpoPassword(user.id, hashedPassword);

  await invalidatePasswordResetToken(data.token);

  return res;
};
