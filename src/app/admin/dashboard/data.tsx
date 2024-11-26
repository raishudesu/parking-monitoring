import {
  BookUser,
  Building2,
  ChartColumnIncreasing,
  History,
  LayoutGrid,
  Logs,
  MessageCircle,
  Settings,
  Shield,
  SquareParking,
  TriangleAlert,
  Users,
} from "lucide-react";

export const accountsTab = [
  {
    name: "Administrators",
    icon: <Shield />,
    link: "/admin/dashboard/administrators",
  },
  {
    name: "Gate Pass Owners",
    icon: <Users />,
    link: "/admin/dashboard/accounts",
  },
];

export const logsTab = [
  {
    name: "Admin Logs",
    icon: <Logs />,
    link: "/admin/dashboard/admin-logs",
  },
  {
    name: "Visitors",
    icon: <BookUser />,
    link: "/admin/dashboard/visitors",
  },
  {
    name: "Violations",
    icon: <TriangleAlert />,
    link: "/admin/dashboard/violations",
  },
  {
    name: "Sessions",
    icon: <History />,
    link: "/admin/dashboard/sessions",
  },
];

export const sideNavLinks = [
  {
    name: "Dashboard",
    icon: <LayoutGrid />,
    link: "/admin/dashboard",
  },
  {
    name: "Analytics",
    icon: <ChartColumnIncreasing />,
    link: "/admin/dashboard/analytics",
  },

  {
    name: "Parking Spaces",
    icon: <SquareParking />,
    link: "/admin/dashboard/parking-spaces",
  },
];

export const othersTab = [
  {
    name: "Colleges",
    icon: <Building2 />,
    link: "/admin/dashboard/colleges",
  },
  {
    name: "Feedbacks",
    icon: <MessageCircle />,
    link: "/admin/dashboard/feedbacks",
  },
];

export const securityRoleTabs = [
  {
    name: "Visitors",
    icon: <BookUser />,
    link: "/admin/dashboard/visitors",
  },
  {
    name: "Settings",
    icon: <Settings />,
    link: "/admin/dashboard/settings",
  },
];
