import { compare, hash } from "bcrypt";
import {
  createGpoAccount,
  deleteGpoAccount,
  getGpoByGatePassNumber,
  updateGpoAccount,
} from "../data-access/gpo-users";
import { LoginError } from "./errors";
import { z } from "zod";
import { gpoAccountSchema } from "@/lib/zod";

// USE CASE FOR GPO LOG IN
export const gpoLoginUseCase = async (
  gatePassNumber: string,
  plainTextPassword: string
) => {
  const gpo = await getGpoByGatePassNumber(gatePassNumber);

  if (!gpo) {
    throw new LoginError();
  }

  const passwordMatched = await compare(plainTextPassword, gpo.password);

  if (!passwordMatched) throw new LoginError();

  const { password: newUserPassword, ...sanitizedGpo } = gpo; // DTO to exclude the password property upon sending the user details back

  return sanitizedGpo;
};

// GPO ACCOUNT CREATION USE CASE
export const gpoCreateAccountUseCase = async (
  data: z.infer<typeof gpoAccountSchema>
) => {
  // VALIDATE THE DATA FIRST
  const validatedData = gpoAccountSchema.parse(data);

  // HASH THE PASSWORD
  const hashedPwd = await hash(validatedData.password, 10);

  validatedData.password = hashedPwd;

  const gpo = await createGpoAccount(validatedData);

  if (!gpo) throw Error("Creating an GPO Account failed.");

  // FILTER OUT THE PASSWORD PROPERTY FROM THE RETURNED OBJECT
  const { password: newGpoPassword, ...filteredGpoAccount } = gpo;

  return filteredGpoAccount;
};

// GPO ACCOUNT UPDATE USE CASE
export const updateGpoAccountUseCase = async (
  gatePassNumber: string,
  data: z.infer<typeof gpoAccountSchema>
) => {
  const gpo = await updateGpoAccount(gatePassNumber, data);

  if (!gpo)
    throw Error(
      `Updating GPO Account with Gate Pass Number: ${gatePassNumber} failed.`
    );

  const { password: newGpoPassword, ...filteredGpoAccount } = gpo;

  return filteredGpoAccount;
};

// GPO ACCOUNT DELETE USE CASE
export const deleteGpoAccountUseCase = async (gatePassNumber: string) => {
  await deleteGpoAccount(gatePassNumber);

  return;
};
