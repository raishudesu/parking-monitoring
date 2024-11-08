"use server";

import { createServerAction } from "zsa";
import { updateGpoPasswordUseCase } from "@/use-cases/gpo-users";
import { updatePasswordSchema } from "@/lib/zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";

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

export const checkCalendarConnection = createServerAction().handler(
  async () => {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      throw new Error("Not authenticated");
    }

    const connection = await prisma.googleCalendarConnection.findUnique({
      where: { userId: session.user.id },
      select: { id: true },
    });

    return !!connection;
  }
);
