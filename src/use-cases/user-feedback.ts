import {
  createUserFeedback,
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
