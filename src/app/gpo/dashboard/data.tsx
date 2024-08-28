import { LayoutGrid, MapPin, ScanLine, Settings } from "lucide-react";

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
    name: "Scan",
    icon: <ScanLine />,
    link: "/gpo/dashboard/scan",
  },
  {
    name: "Settings",
    icon: <Settings />,
    link: "/gpo/dashboard/settings",
  },
];
