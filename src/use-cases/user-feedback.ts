import { createAdminLog } from "@/data-access/admin-log";
import {
  createUserFeedback,
  deleteUserFeedback,
  getAllUserFeedback,
} from "@/data-access/user-feedback";
import { userFeedBackSchema } from "@/lib/zod";
import { z } from "zod";

export const createUserFeedbackUseCase = async (
  data: z.infer<typeof userFeedBackSchema>
) => {
  const feedback = await createUserFeedback(data);

  return feedback;
};

export const getAllUserFeedbackUseCase = async () => {
  const feedbacks = await getAllUserFeedback();

  return feedbacks;
};

export const deleteUserFeedbackUseCase = async (
  feedbackId: string,
  auditAdminId: string
) => {
  const feedback = await deleteUserFeedback(feedbackId);

  await createAdminLog({
    action: "DELETE",
    adminId: auditAdminId,
    table: "USERFEEDBACK",
  });

  return feedback;
};
