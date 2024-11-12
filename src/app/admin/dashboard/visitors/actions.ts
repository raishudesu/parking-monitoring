"use server";

import { collegeCreationSchema, visitorCardCreationSchema } from "@/lib/zod";
import {
  createCollegeUseCase,
  deleteCollegeByIdUseCase,
  updateCollegeByIdUseCase,
} from "@/use-cases/colleges";
import { createVisitorCardUseCase } from "@/use-cases/visitors";
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

// export const updateCollegeAction = createServerAction()
//   .input(
//     z.object({
//       auditAdminId: z.string(),
//       collegeId: z.string(),
//       collegeName: z.string(),
//     })
//   )
//   .handler(async ({ input }) => {
//     const res = await updateCollegeByIdUseCase(
//       input.auditAdminId,
//       input.collegeId,
//       input.collegeName
//     );

//     revalidatePath("/admin/dashboard/colleges");

//     return res;
//   });

// export const deleteCollegeAction = createServerAction()
//   .input(
//     z.object({
//       auditAdminId: z.string(),
//       collegeId: z.string(),
//     })
//   )
//   .handler(async ({ input }) => {
//     const res = await deleteCollegeByIdUseCase(
//       input.auditAdminId,
//       input.collegeId
//     );

//     revalidatePath("/admin/dashboard/colleges");

//     return res;
//   });
