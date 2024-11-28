"use server";

import { driverBehaviorReportSchema } from "@/lib/zod";
import { submitBehaviorReportUseCase } from "@/use-cases/driver-behavior-report";
import { createServerAction } from "zsa";

export const submitReportAction = createServerAction()
  .input(driverBehaviorReportSchema)
  .handler(async ({ input }) => {
    const report = await submitBehaviorReportUseCase(input);

    return report;
  });
