import { ReactNode } from "react";
import SideNav from "./side-nav";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

const AdminDashboardLayout = async ({ children }: { children: ReactNode }) => {
  const session = await getServerSession(authOptions);

  if (!(session?.user.role === "ADMIN")) {
    redirect("/admin/sign-in  ");
  }

  return (
    <div className="w-full flex h-screen">
      <SideNav />
      <div className="w-full h-full overflow-y-scroll ">{children}</div>
    </div>
  );
};

export default AdminDashboardLayout;
