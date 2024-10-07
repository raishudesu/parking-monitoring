import { ReactNode } from "react";
import SideNav from "./side-nav";
import SideSheet from "./side-sheet";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getGpoByIdUseCase } from "@/use-cases/gpo-users";
import { redirect } from "next/navigation";

const GpoDashboardLayout = async ({ children }: { children: ReactNode }) => {
  const session = await getServerSession(authOptions);

  const currentGpo = await getGpoByIdUseCase(session?.user.id as string);
  if (!currentGpo.isActive) redirect("/gpo/deactivated");

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
