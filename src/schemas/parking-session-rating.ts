import { z } from "zod";

export const ratingSchema = z.object({
  sessionId: z.string(),
  rating: z.number(),
});
