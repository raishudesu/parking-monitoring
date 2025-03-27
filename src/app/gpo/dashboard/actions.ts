"use server";

import { createServerAction } from "zsa";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { endGpoSessionUseCase } from "@/use-cases/gpo-sessions";
import { createParkingSessionRating } from "@/data-access/parking-session-rating";
import { ratingSchema } from "@/schemas/parking-session-rating";

export const endSessionAction = createServerAction()
  .input(z.string())
  .handler(async ({ input }) => {
    // console.log(input);
    const res = await endGpoSessionUseCase(input);

    return res;
  });

export const submitRatingAction = createServerAction()
  .input(ratingSchema)
  .handler(async ({ input }) => {
    const res = await createParkingSessionRating({
      rating: input.rating,
      sessionId: input.sessionId,
    });

    if (res) revalidatePath("/gpo/dashboard/parking-spaces");

    return res;
  });
