"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import { google } from "googleapis";

type CalendarData = {
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
};

export const createCalendarEvent = async (calendarData: CalendarData) => {
  const session = await getServerSession(authOptions);

  const oauth2Client = new google.auth.OAuth2();

  oauth2Client.setCredentials({
    access_token: session?.access_token,
  });

  const calendar = google.calendar({ version: "v3", auth: oauth2Client });

  const event = {
    summary: calendarData.title,
    description: calendarData.description,
    start: {
      dateTime: calendarData.startTime,
      timeZone: "Asia/Manila", // Replace with appropriate timezone
    },
    end: {
      dateTime: calendarData.endTime,
      timeZone: "Asia/Manila", // Replace with appropriate timezone
    },
    reminders: {
      useDefault: false,
      overrides: [
        { method: "email", minutes: 30 },
        { method: "popup", minutes: 30 },
      ],
    },
  };

  const response = calendar.events.insert(() => {
    return {
      calendarId: "primary",
      resource: event,
    };
  });

  return response;
};
