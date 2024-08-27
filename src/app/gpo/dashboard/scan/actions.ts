"use server";

import { createServerAction } from "zsa";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createGpoSessionUseCase } from "@/use-cases/gpo-sessions";

const gpoSessionCreationSchema = z.object({
  parkingSpaceId: z.string(),
  gpoAccountID: z.string(),
});

export const createGpoSessionAction = createServerAction()
  .input(gpoSessionCreationSchema)
  .handler(async ({ input }) => {
    const res = await createGpoSessionUseCase(
      input.parkingSpaceId,
      input.gpoAccountID
    );

    if (res) revalidatePath("/gpo/dashboard/parking-spaces");

    return res;
  });
