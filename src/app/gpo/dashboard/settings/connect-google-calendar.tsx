"use client";

import { useState, useEffect } from "react";
import { checkCalendarConnection } from "./actions";
import { useServerAction } from "zsa-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

export default function ConnectGoogleCalendar() {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { execute, isPending } = useServerAction(checkCalendarConnection);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const [data, err] = await execute();
        setIsConnected(data!);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to check connection"
        );
        setIsConnected(false);
      }
    };

    checkConnection();
  }, [execute]);

  const handleConnect = async () => {
    try {
      setIsConnecting(true);
      setError(null);
      const response = await fetch("/api/connect/google");

      if (!response.ok) {
        throw new Error("Failed to initiate connection");
      }

      const { url } = await response.json();
      window.location.href = url;
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Error connecting to Google Calendar"
      );
    } finally {
      setIsConnecting(false);
    }
  };

  if (isPending) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="text-gray-600">Checking connection status...</div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="mb-4">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (isConnected) {
    return (
      <Alert className="mb-4 bg-green-50">
        <AlertTitle>Success</AlertTitle>
        <AlertDescription>Calendar Connected ✅</AlertDescription>
      </Alert>
    );
  }

  return (
    <Button onClick={handleConnect} disabled={isConnecting} className="w-full">
      {isConnecting ? "Connecting..." : "Connect Google Calendar"}
    </Button>
  );
}
