import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  cookies().delete("show_rating_dialog");
  return NextResponse.json({ success: true });
}
