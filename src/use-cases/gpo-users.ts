import { compare } from "bcrypt";
import {
  createGpoAccount,
  getGpoByGatePassNumber,
} from "../data-access/gpoAccount";
import { LoginError } from "./errors";
import { z } from "zod";
import { gpoAccountSchema } from "@/lib/zod";

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

export const gpoCreateAccountUseCase = async (
  data: z.infer<typeof gpoAccountSchema>
) => {
  const gpo = await createGpoAccount(data);

  return gpo;
};
