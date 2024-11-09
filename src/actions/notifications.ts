// /actions/sendPushNotification.ts

import prisma from "@/lib/db";
import webpush from "web-push";

export const sendPushNotification = async (
  userId: string,
  message: string,
  title: string
) => {
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

  // Loop over each subscription and send the push notification
  subscriptions.forEach(async (subscription) => {
    const pushSubscription = {
      endpoint: subscription.endpoint,
      expirationTime: null,
      keys: {
        p256dh: subscription.p256dhKey,
        auth: subscription.authKey,
      },
    };

    const payload = JSON.stringify({
      title: title,
      body: String(message),
      icon: "/logo.png",
    });

    try {
      await webpush.sendNotification(pushSubscription, payload);

      console.log("Notification sent successfully.");
    } catch (error) {
      console.error("Error sending notification:", error);
    }
  });
};
