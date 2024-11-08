import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { subscription, userId } = body;
    const { endpoint, keys } = subscription;
    const { p256dh, auth } = keys;

    const existingSubscription = await prisma.subscription.findUnique({
      where: { endpoint },
    });

    if (!existingSubscription) {
      // Create a new subscription if one doesn't already exist
      await prisma.subscription.create({
        data: {
          userId,
          endpoint,
          p256dhKey: p256dh,
          authKey: auth,
        },
      });
    } else {
      // Update existing subscription keys if they've changed
      await prisma.subscription.update({
        where: { endpoint },
        data: {
          p256dhKey: p256dh,
          authKey: auth,
          updatedAt: new Date(),
        },
      });
    }

    return NextResponse.json(
      {
        message: "Subscription saved successfully.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving subscription:", error);
    return NextResponse.json(
      {
        error: "error: 'Failed to save subscription'",
      },
      { status: 500 }
    );
  }
}
