import { TEmailData } from "@/types/email";
import nodemailer from "nodemailer";

export const sendEmail = async (data: TEmailData) => {
  try {
    // Validate input
    if (!data.to || !data.subject || !data.html) {
      throw new Error("Missing required email fields");
    }

    // Ensure environment variables are set
    if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
      throw new Error("SMTP credentials not configured");
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
      tls: {
        rejectUnauthorized: process.env.REJECT_UNAUTHORIZED !== "false",
      },
    });

    const message = {
      from: `PARKSU Admin <${process.env.SMTP_USER}>`,
      to: data.to,
      subject: data.subject,
      html: data.html,
    };

    await Promise.race([
      transporter.sendMail(message),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Email sending timed out")), 9000)
      ),
    ]);

    console.log(`Email sent to ${data.to} with subject: ${data.subject}`);
    return { ok: true };
  } catch (error: any) {
    console.error("Email sending failed:", error);
    return { ok: false, error: error.message || "Failed to send email" };
  }
};
