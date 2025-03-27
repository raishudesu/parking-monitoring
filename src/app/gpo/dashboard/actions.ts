"use server";

import { createServerAction } from "zsa";
import { z } from "zod";
import { endGpoSessionUseCase } from "@/use-cases/gpo-sessions";
import { createParkingSessionRating } from "@/data-access/parking-session-rating";
import { ratingSchema } from "@/schemas/parking-session-rating";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export const endSessionAction = createServerAction()
  .input(z.object({ sessionId: z.string(), userId: z.string() }))
  .handler(async ({ input }) => {
    try {
      const res = await endGpoSessionUseCase(input.userId);

      // Set a cookie to trigger the rating dialog
      if (res) {
        cookies().set(
          "show_rating_dialog",
          JSON.stringify({
            sessionId: input.sessionId,
            timestamp: new Date().toISOString(),
          }),
          {
            httpOnly: true,
            maxAge: 60 * 60, // 1 hour
          }
        );
      }

      revalidatePath("/");

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

    revalidatePath("/gpo/dashboard");

    return res;
  });
