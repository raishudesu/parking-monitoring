import prisma from "@/lib/db";

export const getAdmin = async (email: string) => {
  const admin = prisma.admin.findUnique({
    where: {
      corpEmail: email,
    },
  });

  return admin;
};
