import { ReactNode } from "react";
import SideNav from "./side-nav";
import SideSheet from "./side-sheet";

const AdminDashboardLayout = async ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full flex h-screen">
      <SideNav />
      <div className="w-full h-full overflow-y-scroll ">
        <div className="flex items-center gap-4 p-6 pb-3 lg:hidden bg-orange-500 bg-opacity-25 border-b">
          <SideSheet />
          <h1 className="scroll-m-20 text-2xl text-primary font-bold tracking-tight lg:text-5xl">
            ParkSU
          </h1>
        </div>
        <div className="h-full bg-slate-50">{children}</div>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
