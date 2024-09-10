"use server";

import { createServerAction } from "zsa";
import {
  accountCreationSchema,
  gpoAccountSchema,
  gpoUpdateAccountSchema,
} from "@/lib/zod";
import {
  createGpoAccountUseCase,
  deactivateGpoAccountUseCase,
  reactivateGpoAccountUseCase,
  updateGpoAccountUseCase,
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

export const updateGpoAccountAction = createServerAction()
  .input(gpoUpdateAccountSchema)
  .handler(async ({ input }) => {
    const gpo = await updateGpoAccountUseCase(input.accountId, input.data);

    if (gpo) revalidatePath("/admin/dashboard/accounts");

    return gpo;
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
