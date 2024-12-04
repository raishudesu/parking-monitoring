"use server";

import { downtimeLogSchema } from "@/lib/zod";
import { createDowntimeLogUseCase } from "@/use-cases/downtime-log";
import { restoreCreditScoresByDowntimeUseCase } from "@/use-cases/gpo-violations";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createServerAction } from "zsa";

export const createDowntimeLogAction = createServerAction()
  .input(downtimeLogSchema)
  .handler(async ({ input }) => {
    const data = {
      startedAt: new Date(input.startedAt),
      endedAt: new Date(input.endedAt),
      adminId: input.adminId,
    };

    const res = await createDowntimeLogUseCase(data);

    revalidatePath("/admin/dashboard/downtime-logs");

    return res;
  });

export const restoreCreditScoresByDowntimeAction = createServerAction()
  .input(
    z.object({
      logId: z.string(),
      accountIds: z.array(z.string()),
    })
  )
  .handler(async ({ input }) => {
    const resolved = await restoreCreditScoresByDowntimeUseCase(
      input.logId,
      input.accountIds
    );

    revalidatePath("/admin/dashboard/downtime-logs");

    return resolved;
  });
