"use server";

import { createPasswordResetToken } from "@/data-access/password-reset-token";
import { sendEmail } from "@/lib/email";
import { generateToken } from "@/lib/utils";
import { passwordResetSchema } from "@/schemas/password-reset-token-schema";
import { TEmailData } from "@/types/email";
import { resetUserPassword } from "@/use-cases/gpo-users";
import { z } from "zod";
import { createServerAction } from "zsa";

export const resetUsePasswordAction = createServerAction()
  .input(z.object({ email: z.string() }))
  .handler(async ({ input }) => {
    const tokenData = await createPasswordResetToken({
      email: input.email,
      token: generateToken(),
      expiresAt: new Date(Date.now() + 60 * 60 * 1000),
    });

    const emailData: TEmailData = {
      to: input.email,
      subject: "ParkSU Account Password Reset",
      html: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Reset Your ParkSU Account Password</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4; color: #333333;">
     
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
      <table role="presentation" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 6px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
        <tr>
          <td style="padding: 40px 30px;">
            <h1 style="margin: 0 0 20px; font-size: 24px; line-height: 32px; color: #333333;">Reset Your Password</h1>
            
            <p style="margin: 0 0 24px; font-size: 16px; line-height: 24px;">
              We received a request to reset your password for your ParkSU account. If you didn't make this request, you can safely ignore this email.
            </p>
            
            <p style="margin: 0 0 24px; font-size: 16px; line-height: 24px;">
              To reset your password, click the button below:
            </p>
            
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
              <tr>
                <td style="padding: 15px 0; text-align: center;">
                  <a href="${
                    process.env.NEXT_PUBLIC_APP_URL
                  }/gpo/reset-password?token=${
        tokenData.token
      }&email=${encodeURIComponent(tokenData.email)}" 
                     style="display: inline-block; padding: 12px 24px; background-color: #FE7D55; color: #ffffff; text-decoration: none; font-weight: bold; border-radius: 4px; font-size: 16px;">
                    Reset Password
                  </a>
                </td>
              </tr>
            </table>
            
            <p style="margin: 24px 0 0; font-size: 16px; line-height: 24px;">
              This password reset link will expire in 1 hour for security reasons.
            </p>
            
            <p style="margin: 24px 0 0; font-size: 16px; line-height: 24px;">
              If you're having trouble clicking the button, copy and paste the URL below into your web browser:
            </p>
            
            <p style="margin: 8px 0 0; font-size: 14px; line-height: 22px; word-break: break-all; color: #6B7280;">
              ${process.env.NEXT_PUBLIC_APP_URL}/gpo/reset-password?token=${
        tokenData.token
      }&email=${encodeURIComponent(tokenData.email)}
            </p>
            
            <div style="margin-top: 32px; padding: 16px; background-color: #f9fafb; border-radius: 4px; border-left: 4px solid #FE7D55;">
              <p style="margin: 0; font-size: 14px; line-height: 22px; color: #4B5563;">
                <strong>Security Tip:</strong> ParkSU will never ask for your password via email. If you receive any suspicious emails requesting your password, please report them to us immediately.
              </p>
            </div>
          </td>
        </tr>
      </table>
      
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
        <tr>
          <td style="padding: 30px 20px; text-align: center; font-size: 14px; color: #6B7280;">
            <p style="margin: 0 0 10px;">© ${new Date().getFullYear()} PARKSU. All rights reserved.</p>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `,
    };

    const emailRes = await sendEmail(emailData);

    return emailRes;
  });

export const updateUserPasswordAction = createServerAction()
  .input(passwordResetSchema)
  .handler(async ({ input }) => {
    const res = await resetUserPassword(input);

    return res;
  });
