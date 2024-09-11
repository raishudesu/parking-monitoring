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
    const college = await createCollegeUseCase(input.collegeName);

    if (college) revalidatePath("/admin/dashboard/colleges");

    return college;
  });

export const updateCollegeAction = createServerAction()
  .input(
    z.object({
      collegeId: z.number(),
      collegeName: z.string(),
    })
  )
  .handler(async ({ input }) => {
    const res = await updateCollegeByIdUseCase(
      input.collegeId,
      input.collegeName
    );

    revalidatePath("/admin/dashboard/colleges");

    return res;
  });

export const deleteCollegeAction = createServerAction()
  .input(
    z.object({
      collegeId: z.number(),
    })
  )
  .handler(async ({ input }) => {
    const res = await deleteCollegeByIdUseCase(input.collegeId);

    revalidatePath("/admin/dashboard/colleges");

    return res;
  });
