"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Logo from "@/components/logo";
import { Menu } from "lucide-react";
import { useState } from "react";
import NavLinks from "../nav-links";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import SignOutBtn from "@/components/signout-btn";

const SideSheetMap = () => {
  const [open, setOpen] = useState(false);

  const session = useSession();

  const user = session?.data?.user;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <div className="border py-3 px-4 bg-secondary rounded-lg">
          <Menu />
        </div>
      </SheetTrigger>
      <SheetContent side={"left"} className="w-full dark:bg-zinc-900">
        <SheetHeader>
          <SheetTitle>
            <Logo />
          </SheetTitle>
        </SheetHeader>
        <div className="w-full flex flex-col gap-6">
          <ul className="flex flex-col gap-3">
            <NavLinks open={open} setOpen={setOpen} />
          </ul>
          <div className="w-full p-3 flex flex-col gap-4 rounded-xl">
            <div className="w-full flex gap-2 items-center">
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
  );
};

export default SideSheetMap;
