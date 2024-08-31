import prisma from "@/lib/db";

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
