"use server";

import { createServerAction } from "zsa";
import { accountCreationSchema, gpoAccountSchema } from "@/lib/zod";
import {
  createGpoAccountUseCase,
  deactivateGpoAccountUseCase,
  reactivateGpoAccountUseCase,
} from "@/use-cases/gpo-users";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const createGpoAccountAction = createServerAction()
  .input(accountCreationSchema)
  .handler(async ({ input }) => {
    const res = await createGpoAccountUseCase(input);

    if (res) revalidatePath("/admin/dashboard/accounts");

    return res;
  });

export const deactivateGpoAccountAction = createServerAction()
  .input(
    z.object({
      accountId: z.string(),
    })
  )
  .handler(async ({ input }) => {
    const res = await deactivateGpoAccountUseCase(input.accountId);

    if (res) revalidatePath("/admin/dashboard/accounts");

    return res;
  });

export const reactivateGpoAccountAction = createServerAction()
  .input(
    z.object({
      accountId: z.string(),
    })
  )
  .handler(async ({ input }) => {
    const res = await reactivateGpoAccountUseCase(input.accountId);

    if (res) revalidatePath("/admin/dashboard/accounts");

    return res;
  });
