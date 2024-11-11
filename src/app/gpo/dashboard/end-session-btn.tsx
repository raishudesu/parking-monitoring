"use client";

import { Button } from "@/components/ui/button";
import { useServerAction } from "zsa-react";
import { endSessionAction } from "./actions";
import { toast } from "@/components/ui/use-toast";
import { SquareParkingOff } from "lucide-react";
import { useNotification } from "@/hooks/notification-hook";
import { useEffect } from "react";

export const TIMER_STORAGE_KEY = "activeParkingTimer";

const EndSessionBtn = ({
  gpoAccountId,
  shouldEndAt,
  parkingSpaceName,
}: {
  gpoAccountId: string;
  shouldEndAt: Date;
  parkingSpaceName: string;
}) => {
  const { isPending, execute } = useServerAction(endSessionAction);
  const { startTimer, stopTimer } = useNotification();

  // Start timer on mount if there's an active timer or session data
  useEffect(() => {
    const storedTimerData = JSON.parse(
      localStorage.getItem(TIMER_STORAGE_KEY) || "{}"
    );

    const startTimerFn = async (endAt: Date, parkingName: string) => {
      await startTimer(endAt, parkingName);
    };

    if (storedTimerData?.shouldEndAt && storedTimerData?.parkingSpaceName) {
      // Parse shouldEndAt date back from string
      const endAt = new Date(storedTimerData.shouldEndAt);

      if (endAt > new Date()) {
        startTimerFn(endAt, storedTimerData.parkingSpaceName);
      } else {
        localStorage.removeItem(TIMER_STORAGE_KEY); // Clear if expired
      }
    } else {
      // If no stored data, use provided props to start a new timer
      startTimerFn(shouldEndAt, parkingSpaceName);
      localStorage.setItem(
        TIMER_STORAGE_KEY,
        JSON.stringify({
          shouldEndAt: shouldEndAt.toISOString(),
          parkingSpaceName,
        })
      );
    }
  }, []);
  const onEndSession = async () => {
    try {
      const [data, err] = await execute(gpoAccountId);

      if (err) {
        const parsedErrorData = await JSON.parse(err?.data);
        console.log(err);

        toast({
          title: "Something went wrong.",
          variant: "destructive",
        });

        console.error(parsedErrorData);
      }

      if (data) {
        toast({
          title: "Parking session ended successfully.",
          description: "Thank you for using ParkSU!",
        });
        stopTimer();
        localStorage.removeItem(TIMER_STORAGE_KEY);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button
      onClick={onEndSession}
      disabled={isPending}
      className="p-0 self-stretch lg:self-start h-full w-full"
      variant={"ghost"}
    >
      <div className="py-6 w-full h-full bg-background border border-primary hover:bg-slate-100 dark:hover:bg-zinc-900 ease-in-out transition-colors rounded-xl flex flex-col gap-6 justify-center items-center">
        <SquareParkingOff size={100} className="text-primary" />
        <span className="text-xl font-bold">End Session</span>
      </div>
    </Button>
  );
};

export default EndSessionBtn;
