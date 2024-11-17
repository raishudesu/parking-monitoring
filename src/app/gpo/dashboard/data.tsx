import {
  LayoutGrid,
  MapPin,
  MessageCircle,
  ScanLine,
  Settings,
} from "lucide-react";

export const gpoNavLinks = [
  {
    name: "Dashboard",
    icon: <LayoutGrid />,
    link: "/gpo/dashboard",
  },

  {
    name: "Map",
    icon: <MapPin />,
    link: "/gpo/dashboard/map",
  },
  {
    name: "Submit Feedback",
    icon: <MessageCircle />,
    link: "/gpo/dashboard/feedback",
  },
  {
    name: "Settings",
    icon: <Settings />,
    link: "/gpo/dashboard/settings",
  },
];
