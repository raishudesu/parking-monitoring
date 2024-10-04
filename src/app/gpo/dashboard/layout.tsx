import { ReactNode } from "react";
import SideNav from "./side-nav";
import SideSheet from "./side-sheet";

const GpoDashboardLayout = async ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full flex h-screen">
      <SideNav />
      <div className="w-full">
        <SideSheet />
        <div className="h-full md:overflow-y-scroll bg-slate-50">
          {children}
        </div>
      </div>
    </div>
  );
};

export default GpoDashboardLayout;
