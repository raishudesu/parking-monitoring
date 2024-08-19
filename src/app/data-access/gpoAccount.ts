import { z } from "zod";
import prisma from "../lib/db";
import { gpoAccountSchema } from "../lib/zod";
import { hash } from "bcrypt";

export const createGPOAccount = async (
  data: z.infer<typeof gpoAccountSchema>
) => {
  const validatedData = gpoAccountSchema.parse(data);

  const hashedPwd = await hash(validatedData.password, 10);

  validatedData.password = hashedPwd;

  const gpoAccount = await prisma.gPOAccount.create({
    data: validatedData,
  });

  if (!gpoAccount) throw Error("Creating an GPO Account failed.");

  const { password: newUserPassword, ...filteredGPOAccount } = gpoAccount;

  return filteredGPOAccount;
};
