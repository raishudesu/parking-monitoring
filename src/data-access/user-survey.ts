import prisma from "@/lib/db";
import { parkingFeedbackSchema } from "@/lib/zod";
import { z } from "zod";

export const submitSurvey = async (
  data: z.infer<typeof parkingFeedbackSchema>
) => {
  if (data.userId) {
    const res = await prisma.userSurvey.create({
      data: {
        ...data,
        userId: data.userId,
      },
    });

    return res;
  }

  return false;
};

export const deleteSurveyById = async (surveyId: string) => {
  const deletedSurvey = await prisma.userSurvey.delete({
    where: {
      id: surveyId,
    },
  });

  return deletedSurvey;
};
