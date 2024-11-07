import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import emailjs from "@emailjs/browser";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateSecurePassword = (gatePassNumber: string) => {
  // Define the length of the random suffix and prefix
  const randomLength = 4;

  // Function to generate a random string of specified length
  function generateRandomString(length: number) {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  }

  // Generate a random prefix and suffix
  const randomPrefix = generateRandomString(randomLength);
  const randomSuffix = generateRandomString(randomLength);

  // Combine the gate pass number with the random prefix and suffix
  const securePassword = `${randomPrefix}${gatePassNumber}${randomSuffix}`;

  return securePassword;
};

export const parseDate = (date: Date | null) => {
  if (!date) return null;

  const formattedDate = date.toLocaleString("en-US", {
    weekday: "long", // Full name of the day
    year: "numeric",
    month: "long", // Full name of the month
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    // second: 'numeric',
    // hour12: true, // Optional, set to true for 12-hour format or false for 24-hour format
  });

  return formattedDate;
};

export type ReturnEvalPwdStrength = {
  containsUpperCase: boolean;
  containsSpecialChar: boolean;
  containsLowerCase: boolean;
  containsNumbers: boolean;
  pwdScore: number;
  isPwdLong: boolean;
};

export const evalPasswordStrength = (pwd: string): ReturnEvalPwdStrength => {
  let pwdStatus = {
    isPwdLong: false,
    containsLowerCase: false,
    containsUpperCase: false,
    containsNumbers: false,
    containsSpecialChar: false,
    pwdScore: 0,
  };

  // Check pwd length
  if (pwd.length > 8) {
    pwdStatus.pwdScore += 1;
    pwdStatus.isPwdLong = true;
  }
  // Contains lowercase
  if (/[a-z]/.test(pwd)) {
    pwdStatus.pwdScore += 1;
    pwdStatus.containsLowerCase = true;
  }
  // Contains uppercase
  if (/[A-Z]/.test(pwd)) {
    pwdStatus.pwdScore += 1;
    pwdStatus.containsUpperCase = true;
  }
  // Contains numbers
  if (/\d/.test(pwd)) {
    pwdStatus.pwdScore += 1;
    pwdStatus.containsNumbers = true;
  }
  // Contains special characters
  if (/[^A-Za-z0-9]/.test(pwd)) {
    pwdStatus.pwdScore += 1;
    pwdStatus.containsSpecialChar = true;
  }

  return pwdStatus;
};

export const sendEmailNotification = async (email: string) => {
  try {
    const emailRes = await emailjs.send(
      process.env.NEXT_PUBLIC_SERVICE_KEY as string,
      process.env.NEXT_PUBLIC_NOTIFICATION_TEMPLATE_ID as string,
      { to: email },
      process.env.NEXT_PUBLIC_EMAILJS_API_KEY
    );

    return emailRes;
  } catch (error) {
    throw new Error(error as string);
  }
};
