// pages/api/notifications/unsubscribe.ts
import prisma from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { userId, endpoint } = body;

    await prisma.subscription.delete({
      where: {
        userId,
        endpoint,
      },
    });

    return NextResponse.json(
      { message: "Subscription removed successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error removing subscription:", error);
    return NextResponse.json(
      { message: "Error removing subscription" },
      { status: 500 }
    );
  }
}
