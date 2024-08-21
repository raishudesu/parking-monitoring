import { ReactNode } from "react";
import SideNav from "./side-nav";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full flex">
      <SideNav />
      <div className="max-h-screen w-full overflow-x-clip overflow-y-scroll">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
