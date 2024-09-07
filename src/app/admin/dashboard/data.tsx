import {
  Building2,
  History,
  LayoutGrid,
  Logs,
  Settings,
  Shield,
  SquareParking,
  TriangleAlert,
  Users,
} from "lucide-react";

export const sideNavLinks = [
  {
    name: "Dashboard",
    icon: <LayoutGrid />,
    link: "/admin/dashboard",
  },
  {
    name: "Parking Spaces",
    icon: <SquareParking />,
    link: "/admin/dashboard/parking-spaces",
  },
  {
    name: "Accounts",
    icon: <Users />,
    link: "/admin/dashboard/accounts",
  },
  {
    name: "Violations",
    icon: <TriangleAlert />,
    link: "/admin/dashboard/violations",
  },
  {
    name: "Administrators",
    icon: <Shield />,
    link: "/admin/dashboard/administrators",
  },
  {
    name: "Sessions",
    icon: <History />,
    link: "/admin/dashboard/sessions",
  },
  {
    name: "Audit Logs",
    icon: <Logs />,
    link: "/admin/dashboard/audit-logs",
  },
  {
    name: "Colleges",
    icon: <Building2 />,
    link: "/admin/dashboard/colleges",
  },
  {
    name: "Settings",
    icon: <Settings />,
    link: "/admin/dashboard/settings",
  },
];
