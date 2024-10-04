import { ReactNode } from "react";
import SideNav from "./side-nav";
import SideSheet from "./side-sheet";

const AdminDashboardLayout = async ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full flex h-screen">
      <SideNav />
      <div className="w-full h-full overflow-y-scroll ">
        <header className="flex items-center gap-4 p-6 py-4 lg:hidden border-b-2">
          <SideSheet />
          <h1 className="scroll-m-20 text-2xl text-primary font-bold tracking-tight lg:text-5xl">
            ParkSU
          </h1>
        </header>
        <div className="min-h-screen bg-slate-50">{children}</div>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
