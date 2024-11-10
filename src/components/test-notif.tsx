"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";
import { Bell, LoaderCircle } from "lucide-react";

const TestNotif = ({ userId }: { userId: string }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const currentTime = new Date();
  // Set end time to 2 hours from now
  // const endTime = new Date(currentTime.getTime() + 2 * 60 * 60 * 1000);
  const endTime = new Date(currentTime.getTime() + 1 * 60 * 1000);

  const onSend = async () => {
    try {
      setLoading(true);
      // const response = await fetch("/api/notifications/push", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({
      //     userId,
      //     // title: "Parking Notification Test",
      //     // message: "Thanks for enabling notifications!",
      //     parkingId: "4ede36c7-7b5f-4a03-94be-634aab50c176",
      //     startTime: currentTime.toISOString(), // This will be like "2024-11-10T15:30:00.000Z"
      //     endTime: endTime.toISOString(),
      //   }),
      // });

      // if (response.ok) {
      //   toast({
      //     title: "Success!",
      //     description: "Push notification sent.",
      //     //   description: response.json(),
      //   });
      // } else {
      //   toast({
      //     title: "Something went wrong!",
      //     description: "Push notification failed.",
      //     variant: "destructive",
      //     //   description: response.json(),
      //   });
      // }

      Notification.requestPermission().then((permission) => {
        if (permission !== "granted") {
          toast({
            title: "Notification permission not granted.",
            variant: "destructive",
          });
          return;
        }

        new Notification("Notification Test", {
          body: "Necessary permission enabled.",
          tag: "notification-test",
          icon: "/logo.png",
          requireInteraction: true,
        });
      });
    } catch (error) {
      toast({
        title: "Something went wrong.",
        description: "Failed to push notification",
        variant: "destructive",
        //   description: response.json(),
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant={"secondary"}
      onClick={onSend}
      className="w-full max-w-screen-sm border flex gap-2 items-center"
      disabled={loading}
    >
      {loading ? (
        <LoaderCircle
          size={18}
          className="text-muted-foreground animate-spin"
        />
      ) : (
        <Bell size={18} />
      )}
      Test notifications
    </Button>
  );
};

export default TestNotif;
