"use client";
import { urlB64ToUint8Array } from "@/lib/utils";
import { BellOff, BellRing, LoaderCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "./ui/use-toast";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";

export default function NotificationRequest({ userId }: { userId: string }) {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  // Check initial subscription status when component mounts
  useEffect(() => {
    const checkSubscription = async () => {
      if ("serviceWorker" in navigator) {
        try {
          const registration = await navigator.serviceWorker.getRegistration();
          if (registration) {
            const subscription =
              await registration.pushManager.getSubscription();
            setIsSubscribed(
              !!subscription && Notification.permission === "granted"
            );
          }
        } catch (error) {
          console.error("Error checking subscription:", error);
        }
      }
    };

    checkSubscription();
  }, []);

  const handleToggle = async (checked: boolean) => {
    if (checked) {
      await enableNotifications();
    } else {
      await disableNotifications();
    }
  };

  const enableNotifications = async () => {
    if (!("Notification" in window)) {
      toast({ title: "This browser does not support notifications." });
      return;
    }

    try {
      const permission = await Notification.requestPermission();

      if (permission === "granted") {
        await subscribeUser();
        setIsSubscribed(true);
      } else {
        toast({ title: "Notification permission denied." });
        setIsSubscribed(false);
      }
    } catch (error) {
      console.error("Error enabling notifications:", error);
      toast({ title: "Failed to enable notifications." });
      setIsSubscribed(false);
    }
  };

  const disableNotifications = async () => {
    if ("serviceWorker" in navigator) {
      setLoading(true);
      try {
        const registration = await navigator.serviceWorker.getRegistration();
        if (registration) {
          const subscription = await registration.pushManager.getSubscription();
          if (subscription) {
            await subscription.unsubscribe();
            // Remove subscription from backend
            await fetch("/api/notifications/unsubscribe", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                userId,
                endpoint: subscription.endpoint,
              }),
            });
          }
        }
        setIsSubscribed(false);
        toast({ title: "Notifications disabled successfully." });
      } catch (error) {
        console.error("Error disabling notifications:", error);
        toast({ title: "Failed to disable notifications." });
      } finally {
        setLoading(false);
      }
    }
  };

  const subscribeUser = async () => {
    if ("serviceWorker" in navigator) {
      try {
        const registration = await navigator.serviceWorker.getRegistration();
        const swRegistration =
          registration || (await navigator.serviceWorker.register("/sw.js"));

        await generateSubscribeEndPoint(swRegistration);
      } catch (error) {
        toast({
          title: "Error during service worker registration or subscription.",
          description: String(error),
        });
        throw error;
      }
    } else {
      toast({ title: "Service workers are not supported in this browser." });
      throw new Error("Service workers not supported");
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

      await saveSubscription(subscription);
    } catch (error) {
      toast({ title: "Failed to subscribe to notifications." });
      throw error;
    }
  };

  const saveSubscription = async (subscription: PushSubscription) => {
    try {
      setLoading(true);

      const response = await fetch("/api/notifications/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subscription,
          userId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save subscription on the server.");
      }

      toast({ title: "Notification subscription saved successfully." });
    } catch (error) {
      toast({ title: "Failed to save subscription on the server." });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-screen-sm my-12 flex justify-between items-center">
      <div>
        <h2 className="scroll-m-20 pb-2 text-xl tracking-tight first:mt-0">
          Notifications
        </h2>
        <small className="text-sm text-muted-foreground">
          Allow notifications to receive parking session reminders.
        </small>
      </div>
      <div className="cursor-pointer transition-all mt-6 flex items-center gap-2">
        {loading && <LoaderCircle className="animate-spin text-primary" />}
        <Switch
          checked={isSubscribed}
          onCheckedChange={handleToggle}
          disabled={loading}
        />
      </div>
    </div>
  );
}
