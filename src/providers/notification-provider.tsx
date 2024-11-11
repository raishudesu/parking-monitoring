"use client";

import React, { createContext, useState, useEffect, useRef } from "react";

export interface NotificationContextType {
  startTimer: (
    shouldEndAt: Date,
    parkingSpaceName: string
  ) => Promise<number | undefined>;
  stopTimer: () => void;
  intervalId: number | undefined;
  parkingId: string | null;
  setParkingId: (parkingId: string) => void;
}

export const NotificationContext = createContext<
  NotificationContextType | undefined
>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [intervalId, setIntervalId] = useState<number | undefined>(undefined);
  const [parkingId, setParkingId] = useState<string | null>(null);

  const notificationTimer = useRef<Notification | null>(null);

  const startTimer = (
    shouldEndAt: Date,
    parkingSpaceName: string
  ): Promise<number | undefined> => {
    return new Promise((resolve, reject) => {
      let interval: any;

      Notification.requestPermission().then((permission) => {
        if (permission !== "granted")
          return reject("Notification permission not granted");

        interval = setInterval(() => {
          const now = new Date();
          const timeRemaining = shouldEndAt.getTime() - now.getTime();

          if (timeRemaining <= 0) {
            clearInterval(interval);
            notificationTimer.current = new Notification(
              "Parking Session Ended",
              {
                body: `Your parking session at ${parkingSpaceName} has ended.`,
                tag: "parking-timer",
                icon: "/logo.png",
                requireInteraction: true,
              }
            );
          } else {
            // Calculate hours, minutes, and seconds
            const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
            const minutes = Math.floor(
              (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
            );
            const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

            // Format time remaining
            const formattedTime = `${hours > 0 ? `${hours}h ` : ""}${
              minutes < 10 && hours > 0 ? "0" : ""
            }${minutes}m ${seconds < 10 ? "0" : ""}${seconds}s`;

            notificationTimer.current = new Notification(
              `Parking Session at: ${parkingSpaceName}`,
              {
                body: `Time remaining: ${formattedTime}`,
                tag: "parking-timer",
                icon: "/logo.png",
              }
            );

            notificationTimer.current.onclick = () => {
              window.focus();
              window.location.href = "/gpo/dashboard"; // Redirect to your desired page
            };
          }
        }, 1000);

        setIntervalId(interval); // Store the interval ID
        resolve(interval);
      });
    });
  };

  const stopTimer = async () => {
    if (intervalId !== undefined) {
      clearInterval(intervalId);
      setIntervalId(undefined);

      notificationTimer.current?.close();
      notificationTimer.current = null;

      new Notification(`Timer Stopped`, {
        body: `Timer ended`,
        tag: "parking-timer-stopped",
        icon: "/logo.png",
      });
    }
  };

  useEffect(() => {
    return () => {
      // Cleanup interval on unmount
      if (intervalId !== undefined) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  return (
    <NotificationContext.Provider
      value={{ startTimer, stopTimer, intervalId, parkingId, setParkingId }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
