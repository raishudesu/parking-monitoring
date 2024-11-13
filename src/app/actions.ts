"use server";

import { userFeedBackSchema } from "@/lib/zod";
import { createUserFeedbackUseCase } from "@/use-cases/user-feedback";
import { createServerAction } from "zsa";

export const createUserFeedbackAction = createServerAction()
  .input(userFeedBackSchema)
  .handler(async ({ input }) => {
    const feedback = await createUserFeedbackUseCase(input);

    return feedback;
  });
