import { getEndingSessions } from "@/data-access/gpo-sessions";
import { sendEmailNotification } from "@/lib/utils";
import { NextResponse } from "next/server";
// import { getEndingSessions, sendEmailNotification } from "@/lib/session-utils";

export async function GET() {
  // 1. Get sessions ending within the next 30 minutes
  const sessionsEndingSoon = await getEndingSessions(); // Fetch sessions ending in 30 minutes

  // 2. Send notifications to each user
  await Promise.all(
    sessionsEndingSoon.map((session) =>
      sendEmailNotification(session.accountParked.email as string)
    )
  );

  return NextResponse.json({ status: "Notifications sent" });
}
