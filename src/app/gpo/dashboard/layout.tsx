import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import SideNav from "./side-nav";
import SideSheet from "./side-sheet";

const GpoDashboardLayout = async ({ children }: { children: ReactNode }) => {
  const session = await getServerSession(authOptions);

  if (!(session?.user.role === "GPO")) {
    redirect("/gpo/sign-in");
  }

  return (
    <div className="w-full flex h-screen">
      <SideNav />
      <div className="w-full h-full overflow-y-scroll">
        <div className="p-6 pb-3 md:hidden">
          <SideSheet />
        </div>
        {children}
      </div>
    </div>
  );
};

export default GpoDashboardLayout;
