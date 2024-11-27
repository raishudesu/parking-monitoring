"use server";

import { deleteUserFeedbackUseCase } from "@/use-cases/user-feedback";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createServerAction } from "zsa";

export const deleteUserFeedbackAction = createServerAction()
  .input(
    z.object({
      feedbackId: z.string(),
      auditAdminId: z.string(),
    })
  )
  .handler(async ({ input }) => {
    const feedback = await deleteUserFeedbackUseCase(
      input.feedbackId,
      input.auditAdminId
    );

    revalidatePath("/admin/dashboard/feedbacks");

    return feedback;
  });
