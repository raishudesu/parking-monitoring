"use server";

import { createServerAction } from "zsa";
import { updateGpoPasswordUseCase } from "@/use-cases/gpo-users";
import { updatePasswordSchema } from "@/lib/zod";

export const updateGpoPasswordAction = createServerAction()
  .input(updatePasswordSchema)
  .handler(async ({ input }) => {
    const res = await updateGpoPasswordUseCase(
      input.accountId,
      input.newPassword,
      input.oldPassword
    );

    return res;
  });
