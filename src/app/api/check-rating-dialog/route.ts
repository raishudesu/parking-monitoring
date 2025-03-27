// app/api/check-rating-dialog/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = cookies();
  const ratingDialogCookie = cookieStore.get("show_rating_dialog");

  if (ratingDialogCookie) {
    try {
      const dialogData = JSON.parse(ratingDialogCookie.value);
      return NextResponse.json({
        showDialog: true,
        sessionId: dialogData.sessionId,
        timestamp: dialogData.timestamp,
      });
    } catch (error) {
      console.error("Error parsing rating dialog cookie:", error);
    }
  }

  return NextResponse.json({ showDialog: false });
}

export async function POST() {
  cookies().delete("show_rating_dialog");
  return NextResponse.json({ success: true });
}
