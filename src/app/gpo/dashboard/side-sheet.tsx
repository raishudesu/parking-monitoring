"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import NavLinks from "./nav-links";
import Logo from "@/components/logo";
import { Menu } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import SignOutBtn from "@/components/signout-btn";
import { useSession } from "next-auth/react";

const SideSheet = () => {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const session = useSession();

  if (path === "/gpo/dashboard/map") return null;

  const user = session?.data?.user;

  return (
    <div className="flex items-center gap-4 p-6 py-4 lg:hidden border-b-2">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger>
          <div className="text-primary border py-3 px-4 bg-secondary rounded-lg">
            <Menu />
          </div>
        </SheetTrigger>
        <SheetContent side={"left"} className="w-full overflow-auto">
          <SheetHeader>
            <SheetTitle>
              <Logo />
            </SheetTitle>
          </SheetHeader>
          <div className="flex flex-col gap-6">
            <ul className="flex flex-col gap-3">
              <NavLinks open={open} setOpen={setOpen} />
            </ul>
            <div className="w-full p-3 flex flex-col gap-4 rounded-xl">
              <div className="flex gap-2 items-center">
                <Avatar>
                  <AvatarFallback>GPO</AvatarFallback>
                </Avatar>
                <div className="w-full flex flex-col pr-6">
                  <span className="font-semibold">{user?.gatePassNumber}</span>
                  <small className="truncate text-muted-foreground">
                    {user?.corpEmail}
                  </small>
                </div>
              </div>
              <SignOutBtn />
            </div>
          </div>
        </SheetContent>
      </Sheet>
      <h1 className="scroll-m-20 text-2xl text-primary font-bold tracking-tight lg:text-5xl">
        ParkSU
      </h1>
    </div>
  );
};

export default SideSheet;
