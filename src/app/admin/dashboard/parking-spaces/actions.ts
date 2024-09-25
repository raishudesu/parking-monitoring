"use server";

import { parkingSpaceSchema, parkingSpaceUpdateFormSchema } from "@/lib/zod";
import {
  createParkingSpaceUseCase,
  deleteParkingSpaceByIdUseCase,
  updateParkingSpaceByIdUseCase,
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

export const updateParkingSpaceAction = createServerAction()
  .input(parkingSpaceUpdateFormSchema)
  .handler(async ({ input }) => {
    const responseMessage = await updateParkingSpaceByIdUseCase(
      input.parkingSpaceId,
      input.data
    );

    revalidatePath("/admin/dashboard/parking-spaces");

    return responseMessage;
  });

export const deleteParkingSpaceAction = createServerAction()
  .input(
    z.object({
      parkingSpaceId: z.string(),
      auditAdminId: z.string(),
    })
  )
  .handler(async ({ input }) => {
    const responseMessage = await deleteParkingSpaceByIdUseCase(
      input.auditAdminId,
      input.parkingSpaceId
    );

    revalidatePath("/admin/dashboard/parking-spaces");

    return responseMessage;
  });
