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
    orderBy: {
      id: "asc",
    },
  });

  return colleges;
};

export const updateCollegeById = async (
  collegeId: string,
  collegeName: string
) => {
  const college = await prisma.college.update({
    where: {
      id: collegeId,
    },
    data: {
      collegeName,
    },
  });

  return college;
};

export const deleteCollegeById = async (collegeId: string) => {
  const college = await prisma.college.delete({
    where: {
      id: collegeId,
    },
  });

  return college;
};
