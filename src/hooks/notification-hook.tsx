import {
  NotificationContext,
  NotificationContextType,
} from "@/providers/notification-provider";
import { useContext } from "react";

// Custom hook for accessing the notification context
export const useNotification = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
};
