import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import emailjs from "@emailjs/browser";
import {
  CategoryCounters,
  SurveyResponse,
  TransformedSurveyData,
} from "@/types/survey";

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

export function urlB64ToUint8Array(base64String: string): Uint8Array {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export function transformSurveyData(
  surveyResponses: SurveyResponse[]
): TransformedSurveyData {
  // Initialize the result object
  const transformedData: TransformedSurveyData = {
    totalResponses: surveyResponses.length,
    overallExperience: 0,
    easeOfUse: {},
    realtimeFeatures: {},
    qrFunctionality: {},
    notifications: {},
    likelyToRecommend: {},
    suggestions: [],
  };

  // Aggregate data from survey responses
  const categoryCounters: CategoryCounters = {
    easeOfUse: {},
    realtimeFeatures: {},
    qrFunctionality: {},
    notifications: {},
    likelyToRecommend: {},
  };

  surveyResponses.forEach((response) => {
    // Calculate overall experience average
    transformedData.overallExperience += response.overallExperience;

    // Aggregate categorical responses
    const categories: [keyof SurveyResponse, keyof typeof categoryCounters][] =
      [
        ["easeOfUse", "easeOfUse"],
        ["realtimeFeatures", "realtimeFeatures"],
        ["qrFunctionality", "qrFunctionality"],
        ["notificationFeedback", "notifications"],
        ["likelyToRecommend", "likelyToRecommend"],
      ];

    categories.forEach(([sourceKey, targetKey]) => {
      const value = response[sourceKey];
      categoryCounters[targetKey][value] =
        (categoryCounters[targetKey][value] || 0) + 1;
    });

    // Collect non-empty suggestions
    if (response.suggestions && response.suggestions.trim()) {
      transformedData.suggestions.push(response.suggestions);
    }
  });

  // Calculate percentages for each category
  const categories = [
    "easeOfUse",
    "realtimeFeatures",
    "qrFunctionality",
    "notifications",
    "likelyToRecommend",
  ] as const;

  categories.forEach((category) => {
    const counter = categoryCounters[category];
    const total = Object.values(counter).reduce((sum, count) => sum + count, 0);

    transformedData[category] = Object.fromEntries(
      Object.entries(counter).map(([key, count]) => [
        key,
        Math.round((count / total) * 100),
      ])
    );
  });

  // Calculate average overall experience
  transformedData.overallExperience = Number(
    (transformedData.overallExperience / surveyResponses.length).toFixed(1)
  );

  return transformedData;
}

export function calculatePolygonArea(
  coordinates: { lat: number; lng: number }[]
): number {
  const n = coordinates.length;
  let area = 0;

  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n;
    area +=
      coordinates[i].lng * coordinates[j].lat -
      coordinates[j].lng * coordinates[i].lat;
  }

  // Rough conversion to square meters using approximate meters per degree
  const metersPerLatDegree = 111000;
  const metersPerLngDegree =
    Math.cos((coordinates[0].lat * Math.PI) / 180) * 111000;

  return Math.round(
    Math.abs((area * metersPerLatDegree * metersPerLngDegree) / 2)
  );
}
