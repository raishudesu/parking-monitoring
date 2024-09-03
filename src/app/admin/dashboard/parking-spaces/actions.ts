"use server";

import { parkingSpaceSchema } from "@/lib/zod";
import { createParkingSpaceUseCase } from "@/use-cases/parking-spaces";
import { revalidatePath } from "next/cache";
import { createServerAction } from "zsa";

export const createParkingSpaceAction = createServerAction()
  .input(parkingSpaceSchema)
  .handler(async ({ input }) => {
    const parkingSpace = await createParkingSpaceUseCase(input);

    revalidatePath("/admin/dashboard/parking-spaces");

    return parkingSpace;
  });
