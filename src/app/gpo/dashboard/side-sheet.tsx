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
    <div className="p-6 pb-3 lg:hidden bg-orange-500 bg-opacity-25 border-b">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger>
          <div className="border py-3 px-4 bg-secondary rounded-lg">
            <Menu />
          </div>
        </SheetTrigger>
        <SheetContent side={"left"}>
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
                <div className="flex flex-col">
                  <span className="font-semibold">{user?.gatePassNumber}</span>
                  <small className="text-muted-foreground">
                    {user?.corpEmail}
                  </small>
                </div>
              </div>
              <SignOutBtn />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default SideSheet;
