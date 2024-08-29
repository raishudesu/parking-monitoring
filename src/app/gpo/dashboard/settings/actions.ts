"use server";

import { createServerAction } from "zsa";
import { changePasswordSchema } from "./change-password-form";
import { updateGpoPasswordUseCase } from "@/use-cases/gpo-users";
import { z } from "zod";

const formSubmitSchema = z.object({
  oldPassword: z.string(),
  newPassword: z.string(),
  accountId: z.string(),
});

export const updateGpoPasswordAction = createServerAction()
  .input(formSubmitSchema)
  .handler(async ({ input }) => {
    const res = await updateGpoPasswordUseCase(
      input.accountId,
      input.newPassword,
      input.oldPassword
    );

    return res;
  });
