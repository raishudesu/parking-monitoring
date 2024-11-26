"use server";

import { parkingFeedbackSchema } from "@/lib/zod";
import { submitSurveyUseCase } from "@/use-cases/user-survey";
import { createServerAction } from "zsa";

export const submitSurveyAction = createServerAction()
  .input(parkingFeedbackSchema)
  .handler(async ({ input }) => {
    const res = await submitSurveyUseCase(input);

    return res;
  });

// export const deleteSurveyByIdAction = createServerAction().input()
