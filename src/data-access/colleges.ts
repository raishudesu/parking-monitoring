import prisma from "@/lib/db";

export const createCollege = async (collegeName: string) => {
  const college = await prisma.college.create({
    data: {
      collegeName,
    },
  });

  return college;
};

export const getAllColleges = async () => {
  const colleges = await prisma.college.findMany({
    include: {
      _count: {
        select: {
          accounts: true,
        },
      },
    },
  });

  return colleges;
};
