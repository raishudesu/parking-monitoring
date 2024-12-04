"use server";

import { createServerAction } from "zsa";
import {
  accountCreationSchema,
  gpoAccountSchema,
  gpoUpdateAccountSchema,
  updateCreditScoreSchema,
} from "@/lib/zod";
import {
  createGpoAccountUseCase,
  deactivateGpoAccountUseCase,
  reactivateGpoAccountUseCase,
  updateGpoAccountUseCase,
  updateGpoCreditScoreUseCase,
} from "@/use-cases/gpo-users";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const createGpoAccountAction = createServerAction()
  .input(
    z.object({
      auditAdminId: z.string(),
      data: accountCreationSchema,
    })
  )
  .handler(async ({ input }) => {
    const res = await createGpoAccountUseCase(input.auditAdminId, input.data);

    if (res) revalidatePath("/admin/dashboard/accounts");

    return res;
  });

export const updateGpoAccountAction = createServerAction()
  .input(gpoUpdateAccountSchema)
  .handler(async ({ input }) => {
    const gpo = await updateGpoAccountUseCase(
      input.auditAdminId as string,
      input.accountId,
      input.data
    );

    if (gpo) revalidatePath("/admin/dashboard/accounts");

    return gpo;
  });

export const deactivateGpoAccountAction = createServerAction()
  .input(
    z.object({
      auditAdminId: z.string(),
      accountId: z.string(),
    })
  )
  .handler(async ({ input }) => {
    const res = await deactivateGpoAccountUseCase(
      input.auditAdminId,
      input.accountId
    );

    if (res) revalidatePath("/admin/dashboard/accounts");

    return res;
  });

export const reactivateGpoAccountAction = createServerAction()
  .input(
    z.object({
      auditAdminId: z.string(),
      accountId: z.string(),
    })
  )
  .handler(async ({ input }) => {
    const res = await reactivateGpoAccountUseCase(
      input.auditAdminId,
      input.accountId
    );

    if (res) revalidatePath("/admin/dashboard/accounts");

    return res;
  });

export const updateCreditScoreAction = createServerAction()
  .input(updateCreditScoreSchema)
  .handler(async ({ input }) => {
    const res = await updateGpoCreditScoreUseCase(
      input.userId,
      parseInt(input.creditScore),
      input.adminId
    );

    revalidatePath("/admin/dashboard/accounts");

    return res;
  });
