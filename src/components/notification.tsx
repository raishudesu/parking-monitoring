"use client";
import { urlB64ToUint8Array } from "@/lib/utils";
import { BellOff, BellRing } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "./ui/use-toast";
import { Button } from "./ui/button";

export default function NotificationRequest({ userId }: { userId: string }) {
  const [notificationPermission, setNotificationPermission] = useState<
    "granted" | "denied" | "default"
  >("default");

  // Check permission status when component mounts
  useEffect(() => {
    setNotificationPermission(Notification.permission);
  }, []);

  const showNotification = () => {
    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        setNotificationPermission(permission);
        if (permission === "granted") {
          subscribeUser();
        } else {
          toast({ title: "Please go to settings and enable notifications." });
        }
      });
    } else {
      toast({ title: "This browser does not support notifications." });
    }
  };

  const subscribeUser = async () => {
    if ("serviceWorker" in navigator) {
      try {
        // Check if service worker is already registered
        const registration = await navigator.serviceWorker.getRegistration();
        const swRegistration =
          registration || (await navigator.serviceWorker.register("/sw.js"));
        // Subscribe to push notifications
        await generateSubscribeEndPoint(swRegistration);
      } catch (error) {
        toast({
          title: "Error during service worker registration or subscription.",
        });
        console.error(error);
      }
    } else {
      toast({ title: "Service workers are not supported in this browser." });
    }
  };

  const generateSubscribeEndPoint = async (
    swRegistration: ServiceWorkerRegistration
  ) => {
    const applicationServerKey = urlB64ToUint8Array(
      process.env.NEXT_PUBLIC_VAPID_KEY!
    );
    try {
      const subscription = await swRegistration.pushManager.subscribe({
        applicationServerKey,
        userVisibleOnly: true,
      });

      // Save the subscription details to the backend
      await saveSubscription(subscription);
    } catch (error) {
      toast({ title: "Failed to subscribe to notifications." });
      console.error(error);
    }
  };

  const saveSubscription = async (subscription: PushSubscription) => {
    try {
      const response = await fetch("/api/notifications/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subscription,
          userId,
        }),
      });

      if (!response.ok)
        throw new Error("Failed to save subscription on the server.");
      toast({ title: "Notification subscription saved successfully." });
    } catch (error) {
      toast({ title: "Failed to save subscription on the server." });
      console.error(error);
    }
  };

  const removeNotification = () => {
    setNotificationPermission("denied");
  };

  return (
    <div className="cursor-pointer transition-all">
      {notificationPermission === "granted" ? (
        <BellRing onClick={removeNotification} />
      ) : (
        <BellOff onClick={showNotification} />
      )}
    </div>
  );
}
