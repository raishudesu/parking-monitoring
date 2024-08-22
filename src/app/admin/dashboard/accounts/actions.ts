"use server";

import { createServerAction } from "zsa";
import { accountCreationSchema, gpoAccountSchema } from "@/lib/zod";
import { createGpoAccountUseCase } from "@/use-cases/gpo-users";
import { revalidatePath } from "next/cache";

export const createGpoAccountAction = createServerAction()
  .input(accountCreationSchema)
  .handler(async ({ input }) => {
    const res = await createGpoAccountUseCase(input);

    if (res) revalidatePath("/admin/dashboard/accounts");

    return res;
  });
