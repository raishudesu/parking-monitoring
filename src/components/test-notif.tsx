"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";
import { Bell, LoaderCircle } from "lucide-react";

const TestNotif = ({ userId }: { userId: string }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const onSend = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/notifications/push", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          title: "Parking Notification Test",
          message: "Thanks for enabling notifications!",
        }),
      });

      toast({
        title: "Success!",
        description: "Push notification sent.",
        //   description: response.json(),
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
