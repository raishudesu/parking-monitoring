"use server";

import { adminAccountSchema } from "@/lib/zod";
import { createAdminUseCase } from "@/use-cases/admin";
import { revalidatePath } from "next/cache";
import { createServerAction } from "zsa";

export const createAdminAction = createServerAction()
  .input(adminAccountSchema)
  .handler(async (input) => {
    const data = input.input;

    const res = await createAdminUseCase(data);

    revalidatePath("/admin/dashboard/administrators");

    return res;
  });
