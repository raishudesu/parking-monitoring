import { createGpoAccount } from "@/data-access/gpo-users";
import { NextResponse } from "next/server";

// INCLUDE SESSION AUTH FOR ADMIN

export async function GET(req: Request) {
  return NextResponse.json("Hello");
}

export async function POST(req: Request) {
  const body = await req.json();
  try {
    const gpoAccount = await createGpoAccount(body);

    return NextResponse.json(
      { ok: true, gpoAccount: gpoAccount },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ ok: false, error }, { status: 500 });
  }
}
