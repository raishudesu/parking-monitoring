import { TEmailData } from "@/types/email";
import nodemailer from "nodemailer";

export const sendEmail = async (data: TEmailData) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: process.env.REJECT_UNAUTHORIZED === "true",
    },
  });

  const message = {
    from: `PARKSU Admin <${process.env.SMTP_USER}>`,
    to: data.to,
    subject: data.subject,
    html: data.html,
  };

  await transporter.sendMail(message);

  return { ok: true };
};
