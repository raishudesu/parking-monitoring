"use server";

import { createServerAction } from "zsa";
import {
  accountCreationSchema,
  gpoAccountSchema,
  gpoUpdateAccountSchema,
  updateCreditScoreSchema,
} from "@/lib/zod";
import {
  createGpoAccountUseCase,
  deactivateGpoAccountUseCase,
  reactivateGpoAccountUseCase,
  updateGpoAccountUseCase,
  updateGpoCreditScoreUseCase,
} from "@/use-cases/gpo-users";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { TEmailData } from "@/types/email";
import { sendEmail } from "@/lib/email";

export const createGpoAccountAction = createServerAction()
  .input(
    z.object({
      auditAdminId: z.string(),
      data: accountCreationSchema,
    })
  )
  .handler(async ({ input }) => {
    const res = await createGpoAccountUseCase(input.auditAdminId, input.data);

    const emailData: TEmailData = {
      to: input.data.email,
      subject: "Updated ParkSU Account Details",
      html: `
     <!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>ParkSU Account Update</title>
  </head>
  <body
    style="
      margin: 0;
      padding: 0;
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      color: #333333;
    "
  >
    <table
      role="presentation"
      width="100%"
      cellspacing="0"
      cellpadding="0"
      border="0"
    >
      <tr>
        <td
          style="
            padding: 30px 20px;
            text-align: center;
            font-size: 14px;
            color: #6b7280;
          "
        ></td>
      </tr>
    </table>
    <table
      role="presentation"
      width="100%"
      style="
        max-width: 600px;
        margin: 0 auto;
        background-color: #ffffff;
        border-radius: 6px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      "
    >
      <tr>
        <td style="padding: 40px 30px">
          <h1
            style="
              margin: 0 0 20px;
              font-size: 24px;
              line-height: 32px;
              color: #333333;
            "
          >
            ParkSU Account Update
          </h1>

          <p style="margin: 0 0 24px; font-size: 16px; line-height: 24px">
            Greetings! Your account has been updated. Kindly re-login to check your account. Here's your account
            details:
          </p>

          <div
            style="
              margin-top: 32px;
              padding: 16px;
              background-color: #f9fafb;
              border-radius: 4px;
              border-left: 4px solid #fe7d55;
            "
          >
            <p
              style="
                margin: 0;
                font-size: 14px;
                line-height: 22px;
                color: #4b5563;
              "
            >
              <strong>Email:</strong> ${input.data.email}
              <br />
              <strong>Password:</strong> ${input.data.password}
            </p>
          </div>

          <table
            role="presentation"
            width="100%"
            cellspacing="0"
            cellpadding="0"
            border="0"
          >
            <tr>
              <td style="padding: 15px 0; text-align: center">
                <a
                  href="https://parksu.vercel.app"
                  style="
                    display: inline-block;
                    padding: 12px 24px;
                    background-color: #fe7d55;
                    color: #ffffff;
                    text-decoration: none;
                    font-weight: bold;
                    border-radius: 4px;
                    font-size: 16px;
                  "
                >
                  Go to ParkSU
                </a>
              </td>
            </tr>
          </table>

          <p
            style="
              margin: 0;
              font-size: 14px;
              line-height: 22px;
              color: #4b5563;
            "
          >
            <strong>Security Tip:</strong> Upon logging in, we highly suggest to
            change your password immediately.
          </p>
        </td>
      </tr>
    </table>

    <table
      role="presentation"
      width="100%"
      cellspacing="0"
      cellpadding="0"
      border="0"
    >
      <tr>
        <td
          style="
            padding: 30px 20px;
            text-align: center;
            font-size: 14px;
            color: #6b7280;
          "
        >
          <p style="margin: 0 0 10px">
            © ${new Date().getFullYear()} PARKSU. All rights reserved.
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>
      `,
    };

    await sendEmail(emailData);

    if (res) revalidatePath("/admin/dashboard/accounts");

    return res;
  });

export const updateGpoAccountAction = createServerAction()
  .input(gpoUpdateAccountSchema)
  .handler(async ({ input }) => {
    const gpo = await updateGpoAccountUseCase(
      input.auditAdminId as string,
      input.accountId,
      input.data
    );

    const emailData: TEmailData = {
      to: input.data.email,
      subject: "ParkSU Account Details",
      html: `
     <!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Welcome to ParkSU!</title>
  </head>
  <body
    style="
      margin: 0;
      padding: 0;
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      color: #333333;
    "
  >
    <table
      role="presentation"
      width="100%"
      cellspacing="0"
      cellpadding="0"
      border="0"
    >
      <tr>
        <td
          style="
            padding: 30px 20px;
            text-align: center;
            font-size: 14px;
            color: #6b7280;
          "
        ></td>
      </tr>
    </table>
    <table
      role="presentation"
      width="100%"
      style="
        max-width: 600px;
        margin: 0 auto;
        background-color: #ffffff;
        border-radius: 6px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      "
    >
      <tr>
        <td style="padding: 40px 30px">
          <h1
            style="
              margin: 0 0 20px;
              font-size: 24px;
              line-height: 32px;
              color: #333333;
            "
          >
            Welcome to ParkSU!
          </h1>

          <p style="margin: 0 0 24px; font-size: 16px; line-height: 24px">
            Greetings! Thank you for registering to ParkSU. Here's your account
            details:
          </p>

          <div
            style="
              margin-top: 32px;
              padding: 16px;
              background-color: #f9fafb;
              border-radius: 4px;
              border-left: 4px solid #fe7d55;
            "
          >
            <p
              style="
                margin: 0;
                font-size: 14px;
                line-height: 22px;
                color: #4b5563;
              "
            >
              <strong>Email:</strong> ${input.data.email}
              <br />
              <strong>Password:</strong> ${input.data.password}
            </p>
          </div>

          <table
            role="presentation"
            width="100%"
            cellspacing="0"
            cellpadding="0"
            border="0"
          >
            <tr>
              <td style="padding: 15px 0; text-align: center">
                <a
                  href="https://parksu.vercel.app"
                  style="
                    display: inline-block;
                    padding: 12px 24px;
                    background-color: #fe7d55;
                    color: #ffffff;
                    text-decoration: none;
                    font-weight: bold;
                    border-radius: 4px;
                    font-size: 16px;
                  "
                >
                  Go to ParkSU
                </a>
              </td>
            </tr>
          </table>

          <p
            style="
              margin: 0;
              font-size: 14px;
              line-height: 22px;
              color: #4b5563;
            "
          >
            <strong>Security Tip:</strong> Upon logging in, we highly suggest to
            change your password immediately.
          </p>
        </td>
      </tr>
    </table>

    <table
      role="presentation"
      width="100%"
      cellspacing="0"
      cellpadding="0"
      border="0"
    >
      <tr>
        <td
          style="
            padding: 30px 20px;
            text-align: center;
            font-size: 14px;
            color: #6b7280;
          "
        >
          <p style="margin: 0 0 10px">
            © ${new Date().getFullYear()} PARKSU. All rights reserved.
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>
      `,
    };

    await sendEmail(emailData);

    if (gpo) revalidatePath("/admin/dashboard/accounts");

    return gpo;
  });

export const deactivateGpoAccountAction = createServerAction()
  .input(
    z.object({
      auditAdminId: z.string(),
      accountId: z.string(),
    })
  )
  .handler(async ({ input }) => {
    const res = await deactivateGpoAccountUseCase(
      input.auditAdminId,
      input.accountId
    );

    if (res) revalidatePath("/admin/dashboard/accounts");

    return res;
  });

export const reactivateGpoAccountAction = createServerAction()
  .input(
    z.object({
      auditAdminId: z.string(),
      accountId: z.string(),
    })
  )
  .handler(async ({ input }) => {
    const res = await reactivateGpoAccountUseCase(
      input.auditAdminId,
      input.accountId
    );

    if (res) revalidatePath("/admin/dashboard/accounts");

    return res;
  });

export const updateCreditScoreAction = createServerAction()
  .input(updateCreditScoreSchema)
  .handler(async ({ input }) => {
    const res = await updateGpoCreditScoreUseCase(
      input.userId,
      parseInt(input.creditScore),
      input.adminId
    );

    revalidatePath("/admin/dashboard/accounts");

    return res;
  });
