"use server";

import { createServerAction } from "zsa";
import { z } from "zod";
import { endGpoSessionUseCase } from "@/use-cases/gpo-sessions";
import { createParkingSessionRating } from "@/data-access/parking-session-rating";
import { ratingSchema } from "@/schemas/parking-session-rating";

export const endSessionAction = createServerAction()
  .input(z.string())
  .handler(async ({ input }) => {
    try {
      const res = await endGpoSessionUseCase(input);
      return [res, null];
    } catch (error) {
      console.error("Error in endSessionAction:", error);
      return [null, { message: "Failed to end session" }];
    }
  });

export const submitRatingAction = createServerAction()
  .input(ratingSchema)
  .handler(async ({ input }) => {
    const res = await createParkingSessionRating({
      rating: input.rating,
      sessionId: input.sessionId,
    });

    return res;
  });
