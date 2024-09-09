"use server";

import { parkingSpaceSchema } from "@/lib/zod";
import {
  createParkingSpaceUseCase,
  deleteParkingSpaceByIdUseCase,
} from "@/use-cases/parking-spaces";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createServerAction } from "zsa";

export const createParkingSpaceAction = createServerAction()
  .input(parkingSpaceSchema)
  .handler(async ({ input }) => {
    const parkingSpace = await createParkingSpaceUseCase(input);

    revalidatePath("/admin/dashboard/parking-spaces");

    return parkingSpace;
  });

export const deleteParkingSpaceAction = createServerAction()
  .input(z.string())
  .handler(async ({ input }) => {
    const responseMessage = await deleteParkingSpaceByIdUseCase(input);

    revalidatePath("/admin/dashboard/parking-spaces");

    return responseMessage;
  });
