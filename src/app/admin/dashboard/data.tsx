import {
  BookUser,
  Building2,
  ChartColumnIncreasing,
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
    name: "Accounts",
    icon: <Users />,
    link: "/admin/dashboard/accounts",
  },
  {
    name: "Administrators",
    icon: <Shield />,
    link: "/admin/dashboard/administrators",
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
    name: "Parking Spaces",
    icon: <SquareParking />,
    link: "/admin/dashboard/parking-spaces",
  },
  {
    name: "Sessions",
    icon: <History />,
    link: "/admin/dashboard/sessions",
  },
  {
    name: "Violations",
    icon: <TriangleAlert />,
    link: "/admin/dashboard/violations",
  },
  {
    name: "Visitors",
    icon: <BookUser />,
    link: "/admin/dashboard/visitors",
  },
  {
    name: "Analytics",
    icon: <ChartColumnIncreasing />,
    link: "/admin/dashboard/analytics",
  },
  {
    name: "Settings",
    icon: <Settings />,
    link: "/admin/dashboard/settings",
  },
];
