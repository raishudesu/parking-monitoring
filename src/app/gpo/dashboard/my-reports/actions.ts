"use server";

import { deleteReportByIdUseCase } from "@/use-cases/driver-behavior-report";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createServerAction } from "zsa";

export const deleteReportByIdAction = createServerAction()
  .input(
    z.object({
      reportId: z.string(),
      adminId: z.string().optional(),
    })
  )
  .handler(async ({ input }) => {
    const report = await deleteReportByIdUseCase(input.reportId, input.adminId);

    revalidatePath("/gpo/dashboard/my-reports");

    return report;
  });
