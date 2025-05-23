"use server";

import { updateReportStatusByIdUseCase } from "@/use-cases/driver-behavior-report";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createServerAction } from "zsa";

export const updateReportStatusAction = createServerAction()
  .input(
    z.object({
      reportId: z.string(),
      reportStatus: z.enum(["PENDING", "RESOLVED", "DISMISSED"]),
      adminId: z.string(),
    })
  )
  .handler(async ({ input }) => {
    const report = await updateReportStatusByIdUseCase(
      input.reportId,
      input.reportStatus,
      input.adminId
    );

    revalidatePath("/admin/dashboard/reports/:path*");

    return report;
  });
