"use server";

import { adminAccountSchema, adminUpdateFormSchema } from "@/lib/zod";
import {
  createAdminUseCase,
  deleteAdminByIdUseCase,
  updateAdminByIdUseCase,
} from "@/use-cases/admin";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createServerAction } from "zsa";

export const createAdminAction = createServerAction()
  .input(adminAccountSchema)
  .handler(async ({ input }) => {
    const res = await createAdminUseCase(input);

    revalidatePath("/admin/dashboard/administrators");

    return res;
  });

export const updateAdminAction = createServerAction()
  .input(adminUpdateFormSchema)
  .handler(async ({ input }) => {
    const admin = updateAdminByIdUseCase(input.adminId, input.data);

    revalidatePath("/admin/dashboard/administrators");

    return admin;
  });

export const deleteAdminAction = createServerAction()
  .input(
    z.object({
      adminId: z.string(),
    })
  )
  .handler(async ({ input }) => {
    const res = await deleteAdminByIdUseCase(input.adminId);

    revalidatePath("/admin/dashboard/administrators");

    return res;
  });
