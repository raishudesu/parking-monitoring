import prisma from "@/lib/db";
import { adminAccountSchema, adminUpdateSchema } from "@/lib/zod";
import { Admin } from "@prisma/client";
import { z } from "zod";

export const createAdmin = async (data: z.infer<typeof adminAccountSchema>) => {
  const admin = await prisma.admin.create({
    data,
  });

  return admin;
};

export const getAdmins = async () => {
  const admins = await prisma.admin.findMany({
    omit: {
      password: true,
    },
  });

  return admins;
};

export const getAdminByEmail = async (email: string) => {
  const admin = await prisma.admin.findUnique({
    where: {
      corpEmail: email,
    },
  });

  return admin;
};

export const getAdminById = async (adminId: string) => {
  const admin = await prisma.admin.findUnique({
    where: {
      id: adminId,
    },
  });

  return admin;
};

export const updateAdminPassword = async (
  adminId: string,
  newPassword: string
) => {
  const admin = await prisma.admin.update({
    where: {
      id: adminId,
    },
    data: {
      password: newPassword,
    },
  });

  return admin;
};

export const updateAdminById = async (
  adminId: string,
  data: z.infer<typeof adminUpdateSchema>
) => {
  const admin = await prisma.admin.update({
    where: {
      id: adminId,
    },
    data,
  });

  return admin;
};
