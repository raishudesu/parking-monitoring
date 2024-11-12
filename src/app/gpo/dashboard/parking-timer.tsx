import React, { useEffect, useState } from "react";

interface TimerProps {
  endTime: Date;
  onExpire?: () => void;
}

const Timer: React.FC<TimerProps> = ({ endTime, onExpire }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(endTime));
  const [isHydrated, setIsHydrated] = useState(false); // Ensures client-side rendering

  useEffect(() => {
    setIsHydrated(true); // Mark the component as hydrated

    // Update the timer every second
    const intervalId = setInterval(() => {
      const remainingTime = calculateTimeLeft(endTime);
      setTimeLeft(remainingTime);

      if (remainingTime.total <= 0) {
        clearInterval(intervalId);
        onExpire?.();
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [endTime, onExpire]);

  if (!isHydrated) return null; // Avoid rendering on the server

  const formattedTime = formatTimeLeft(timeLeft);
  return <div className="text-lg py-4">Time remaining: {formattedTime}</div>;
};

function calculateTimeLeft(endTime: Date) {
  const now = new Date();
  const total = Math.max(0, endTime.getTime() - now.getTime());
  const hours = Math.floor(total / (1000 * 60 * 60));
  const minutes = Math.floor((total % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((total % (1000 * 60)) / 1000);

  return { total, hours, minutes, seconds };
}

function formatTimeLeft({
  hours,
  minutes,
  seconds,
}: {
  hours: number;
  minutes: number;
  seconds: number;
}) {
  const pad = (num: number) => String(num).padStart(2, "0");
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

export default Timer;
