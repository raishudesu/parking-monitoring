"use server";

import { collegeCreationSchema } from "@/lib/zod";
import {
  createCollegeUseCase,
  deleteCollegeByIdUseCase,
  updateCollegeByIdUseCase,
} from "@/use-cases/colleges";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createServerAction } from "zsa";

export const createCollegeAction = createServerAction()
  .input(collegeCreationSchema)
  .handler(async ({ input }) => {
    const college = await createCollegeUseCase(
      input.auditAdminId as string,
      input.collegeName
    );

    if (college) revalidatePath("/admin/dashboard/colleges");

    return college;
  });

export const updateCollegeAction = createServerAction()
  .input(
    z.object({
      auditAdminId: z.string(),
      collegeId: z.string(),
      collegeName: z.string(),
    })
  )
  .handler(async ({ input }) => {
    const res = await updateCollegeByIdUseCase(
      input.auditAdminId,
      input.collegeId,
      input.collegeName
    );

    revalidatePath("/admin/dashboard/colleges");

    return res;
  });

export const deleteCollegeAction = createServerAction()
  .input(
    z.object({
      auditAdminId: z.string(),
      collegeId: z.string(),
    })
  )
  .handler(async ({ input }) => {
    const res = await deleteCollegeByIdUseCase(
      input.auditAdminId,
      input.collegeId
    );

    revalidatePath("/admin/dashboard/colleges");

    return res;
  });
