import prisma from "@/lib/db";
import { userFeedBackSchema } from "@/lib/zod";
import { z } from "zod";

export const createUserFeedback = async (
  data: z.infer<typeof userFeedBackSchema>
) => {
  const feedback = await prisma.userFeedback.create({
    data,
  });

  return feedback;
};

export const getAllUserFeedback = async () => {
  const feedbacks = await prisma.userFeedback.findMany();

  return feedbacks;
};

export const deleteUserFeedback = async (feedbackId: string) => {
  const feedback = await prisma.userFeedback.delete({
    where: {
      id: feedbackId,
    },
  });

  return feedback;
};
