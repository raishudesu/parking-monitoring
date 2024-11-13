"use client";

import React, { useEffect, useState } from "react";
import { toast } from "./ui/use-toast";
import { Switch } from "./ui/switch";

export default function NotificationRequest({ userId }: { userId: string }) {
  const [permission, setPermission] = useState<
    "granted" | "default" | "denied"
  >("default");

  // Check initial subscription status when component mounts
  useEffect(() => {
    Notification.requestPermission((permission) => {
      setPermission(permission);
    });
  }, []);

  const handleToggle = async (checked: boolean) => {
    if (checked) {
      await enableNotifications();
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
        toast({ title: "Notification permission granted." });
      } else {
        toast({
          title: "Notification permission denied.",
          description:
            "Allow notifications in your browser settings for this site.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error enabling notifications:", error);
      toast({ title: "Failed to enable notifications." });
    }
  };

  return (
    <div className="max-w-screen-sm my-12 flex justify-between items-center">
      <div>
        <h2 className="scroll-m-20 pb-2 text-xl tracking-tight first:mt-0">
          Notifications
        </h2>
        <small className="text-sm text-muted-foreground">
          Allow notifications to receive parking session timer.
        </small>
      </div>
      <div className="cursor-pointer transition-all mt-6 flex items-center gap-2">
        <Switch
          checked={permission === "granted"}
          onCheckedChange={handleToggle}
        />
      </div>
    </div>
  );
}
