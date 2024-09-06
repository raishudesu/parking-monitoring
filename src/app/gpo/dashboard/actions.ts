"use server";

import { createServerAction } from "zsa";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { endGpoSessionUseCase } from "@/use-cases/gpo-sessions";

export const endSessionAction = createServerAction()
  .input(z.string())
  .handler(async ({ input }) => {
    console.log(input);
    const res = await endGpoSessionUseCase(input);

    if (res) revalidatePath("/gpo/dashboard/parking-spaces");

    return res;
  });
