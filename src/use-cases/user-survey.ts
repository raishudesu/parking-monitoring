import { deleteSurveyById, submitSurvey } from "@/data-access/user-survey";
import { parkingFeedbackSchema } from "@/lib/zod";
import { z } from "zod";

export const submitSurveyUseCase = async (
  data: z.infer<typeof parkingFeedbackSchema>
) => {
  const res = await submitSurvey(data);

  return res;
};

export const deleteSurveyByIdUseCase = async (surveyId: string) => {
  const deletedSurvey = await deleteSurveyById(surveyId);

  return deletedSurvey;
};
