"use server";

import { adminAccountSchema, adminUpdateFormSchema } from "@/lib/zod";
import { createAdminUseCase, updateAdminByIdUseCase } from "@/use-cases/admin";
import { revalidatePath } from "next/cache";
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
