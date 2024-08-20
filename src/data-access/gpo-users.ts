import { z } from "zod";
import prisma from "../lib/db";
import { gpoAccountSchema } from "../lib/zod";
import { hash } from "bcrypt";

// GPO ACCOUNT CREATION
export const createGpoAccount = async (
  data: z.infer<typeof gpoAccountSchema>
) => {
  const gpo = await prisma.gPOAccount.create({
    data,
  });

  return gpo;
};

// GET GPO ACCOUNT BY GATE PASS NUMBER
export const getGpoByGatePassNumber = async (gatePassNumber: string) => {
  const gpo = await prisma.gPOAccount.findUnique({
    where: {
      gatePassNumber,
    },
  });

  return gpo;
};

// UPDATE GPO ACCOUNT BASED FROM GATE PASS NUMBER
export const updateGpoAccount = async (
  gatePassNumber: string,
  data: z.infer<typeof gpoAccountSchema>
) => {
  const gpo = await prisma.gPOAccount.update({
    where: {
      gatePassNumber,
    },
    data,
  });

  return gpo;
};

// DELETE GPO ACCOUNT
// THIS IS UNLIKELY TO BE USED FOR NOW
export const deleteGpoAccount = async (gatePassNumber: string) => {
  const gpo = await getGpoByGatePassNumber(gatePassNumber);

  if (!gpo)
    throw Error(
      `No GPO Account found with Gate Pass Number: ${gatePassNumber}`
    );

  await prisma.gPOAccount.delete({
    where: {
      gatePassNumber,
    },
  });

  return;
};
