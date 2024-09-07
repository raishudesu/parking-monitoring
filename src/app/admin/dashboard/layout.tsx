import { ReactNode } from "react";
import SideNav from "./side-nav";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import SideSheet from "./side-sheet";

const AdminDashboardLayout = async ({ children }: { children: ReactNode }) => {
  const session = await getServerSession(authOptions);

  if (
    !(session?.user.role === "ADMIN" || session?.user.role === "SUPERADMIN")
  ) {
    redirect("/admin/sign-in  ");
  }

  return (
    <div className="w-full flex h-screen">
      <SideNav />
      <div className="w-full h-full overflow-y-scroll ">
        <div className="p-6 pb-3 md:hidden">
          <SideSheet />
        </div>
        <div className="h-full bg-slate-50">{children}</div>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
