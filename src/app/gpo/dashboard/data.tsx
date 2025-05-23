import {
  ClipboardMinus,
  Flag,
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
];

export const feedbackAndReports = [
  {
    name: "Submit Report",
    icon: <Flag />,
    link: "/gpo/dashboard/submit-report",
  },
  {
    name: "My Reports",
    icon: <ClipboardMinus />,
    link: "/gpo/dashboard/my-reports",
  },
];
