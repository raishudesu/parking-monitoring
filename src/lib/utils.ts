import { GPOSession } from "@prisma/client";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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
