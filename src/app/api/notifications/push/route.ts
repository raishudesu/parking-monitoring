import { sendPushNotification } from "@/actions/notifications";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const { userId, message, title } = body;

  try {
    await sendPushNotification(userId, message, title);
    return NextResponse.json(
      { success: "Notification sent successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in test-push:", error);
    return NextResponse.json(
      { error: "Failed to send notification." },
      { status: 500 }
    );
  }
}
