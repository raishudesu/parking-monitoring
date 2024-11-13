"use server";

import {
  collegeCreationSchema,
  visitorCardCreationSchema,
  visitorCardUpdateSchema,
} from "@/lib/zod";
import {
  createCollegeUseCase,
  deleteCollegeByIdUseCase,
  updateCollegeByIdUseCase,
} from "@/use-cases/colleges";
import {
  createVisitorCardUseCase,
  createVisitorSessionUseCase,
  deleteVisitorCardUseCase,
  endVisitorSessionUseCase,
  getOngoingVisitorSessionUseCase,
  updateVisitorCardUseCase,
} from "@/use-cases/visitors";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createServerAction } from "zsa";

export const createVisitorCardAction = createServerAction()
  .input(visitorCardCreationSchema)
  .handler(async ({ input }) => {
    const college = await createVisitorCardUseCase(
      input.cardNumber,
      input.auditAdminId as string
    );

    if (college) revalidatePath("/admin/dashboard/visitors");

    return college;
  });

export const updateVisitorCardAction = createServerAction()
  .input(visitorCardUpdateSchema)
  .handler(async ({ input }) => {
    const res = await updateVisitorCardUseCase(
      input.cardId,
      input.cardNumber,
      input.auditAdminId as string
    );

    revalidatePath("/admin/dashboard/colleges");

    return res;
  });

export const deleteCollegeAction = createServerAction()
  .input(
    z.object({
      cardId: z.string(),
      auditAdminId: z.string(),
    })
  )
  .handler(async ({ input }) => {
    const res = await deleteVisitorCardUseCase(
      input.cardId,
      input.auditAdminId
    );

    revalidatePath("/admin/dashboard/colleges");

    return res;
  });

export const scanVisitorCardAction = createServerAction()
  .input(
    z.object({
      cardId: z.string(),
    })
  )
  .handler(async ({ input }) => {
    const currentSession = await getOngoingVisitorSessionUseCase(input.cardId);

    if (!currentSession) {
      const res = await createVisitorSessionUseCase(input.cardId);
      return res;
    } else {
      const res = await endVisitorSessionUseCase(input.cardId);
      return res;
    }
  });
