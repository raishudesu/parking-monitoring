import {
  deleteSurveyById,
  getAllSurveys,
  getSurveyCount,
  submitSurvey,
} from "@/data-access/user-survey";
import { transformSurveyData } from "@/lib/utils";
import { parkingFeedbackSchema } from "@/lib/zod";
import { z } from "zod";

export const submitSurveyUseCase = async (
  data: z.infer<typeof parkingFeedbackSchema>
) => {
  const res = await submitSurvey(data);

  return res;
};

export const getAllSurveysUseCase = async () => {
  const surveys = await getAllSurveys();

  const transformedData = transformSurveyData(surveys);

  return transformedData;
};

export const getSurveyCountUseCase = async () => {
  const count = await getSurveyCount();

  return count;
};

export const deleteSurveyByIdUseCase = async (surveyId: string) => {
  const deletedSurvey = await deleteSurveyById(surveyId);

  return deletedSurvey;
};
