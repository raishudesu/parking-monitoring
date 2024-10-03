"use server";

import { updatePasswordSchema } from "@/lib/zod";
import { updateAdminPasswordUseCase } from "@/use-cases/admin";
import { createServerAction } from "zsa";

export const updateAdminPasswordAction = createServerAction()
  .input(updatePasswordSchema)
  .handler(async ({ input }) => {
    const res = await updateAdminPasswordUseCase(
      input.accountId,
      input.newPassword,
      input.oldPassword
    );

    return res;
  });
