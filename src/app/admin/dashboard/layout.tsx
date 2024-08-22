import { ReactNode } from "react";
import SideNav from "./side-nav";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full flex h-screen">
      <SideNav />
      <div className="w-full h-full overflow-y-scroll ">{children}</div>
    </div>
  );
};

export default DashboardLayout;
