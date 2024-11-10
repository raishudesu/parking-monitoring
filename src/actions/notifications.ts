// /actions/sendPushNotification.ts

import prisma from "@/lib/db";
import webpush from "web-push";

export const sendPushNotification = async (
  userId: string,
  parkingId: string,
  startTime: Date,
  endTime: Date
) => {
  startTime = new Date(startTime);
  endTime = new Date(endTime);

  try {
    const vapidKeys = {
      publicKey: process.env.NEXT_PUBLIC_VAPID_KEY!,
      privateKey: process.env.VAPID_PRIVATE_KEY!,
    };

    // Set VAPID details
    webpush.setVapidDetails(
      "mailto:your-email@example.com",
      vapidKeys.publicKey,
      vapidKeys.privateKey
    );

    // Retrieve the user's subscription info from the database
    const subscriptions = await prisma.subscription.findMany({
      where: { userId },
    });

    if (subscriptions.length === 0) throw Error("No subscriptions found!");

    // Calculate initial duration in minutes
    const durationInMinutes = Math.floor(
      (endTime.getTime() - startTime.getTime()) / (1000 * 60)
    );

    await Promise.all(
      subscriptions.map(async (subscription) => {
        try {
          const sub = {
            endpoint: subscription.endpoint,
            keys: {
              p256dh: subscription.p256dhKey,
              auth: subscription.authKey,
            },
          };

          await webpush.sendNotification(
            sub,
            JSON.stringify({
              title: "Active Parking Session",
              body: `Time remaining: ${durationInMinutes} minutes`,
              data: {
                type: "PARKING_TIMER",
                parkingId,
                startTime: startTime.toISOString(),
                endTime: endTime.toISOString(),
                requireInteraction: true,
              },
            })
          );
        } catch (error) {
          console.error("Error sending notification:", error);
          if ((error as any).statusCode === 410) {
            await prisma.subscription.delete({
              where: { id: subscription.id },
            });
          }
        }
      })
    );
    return true;
  } catch (error) {
    console.error("Error starting parking notification:", error);
    throw error;
  }
};

export async function endParkingNotification(
  userId: string,
  parkingId: string
) {
  try {
    const subscriptions = await prisma.subscription.findMany({
      where: { userId },
    });

    await Promise.all(
      subscriptions.map(async (subscription) => {
        const sub = {
          endpoint: subscription.endpoint,
          keys: {
            p256dh: subscription.p256dhKey,
            auth: subscription.authKey,
          },
        };
        try {
          await webpush.sendNotification(
            sub,
            JSON.stringify({
              title: "Parking Session Ended",
              body: "Your parking session has ended",
              data: {
                type: "PARKING_ENDED",
                parkingId,
                action: "CLEAR_TIMER",
              },
            })
          );
        } catch (error) {
          console.error("Error sending end notification:", error);
          if ((error as any).statusCode === 410) {
            await prisma.subscription.delete({
              where: { id: subscription.id },
            });
          }
        }
      })
    );

    return true;
  } catch (error) {
    console.error("Error ending parking notification:", error);
    throw error;
  }
}
