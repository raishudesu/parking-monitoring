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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import SignOutBtn from "@/components/signout-btn";
import { useSession } from "next-auth/react";

const SideSheet = () => {
  const [open, setOpen] = useState(false);

  const session = useSession();

  const user = session?.data?.user;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <div className="py-3 px-4 bg-secondary rounded-lg text-primary">
          <Menu />
        </div>
      </SheetTrigger>
      <SheetContent side={"left"} className="w-full overflow-auto">
        <SheetHeader>
          <SheetTitle>
            <Logo />
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-12 ">
          <ul className="flex flex-col gap-3">
            <NavLinks open={open} setOpen={setOpen} />
          </ul>
          <div className="w-full p-3 flex flex-col gap-4 rounded-xl">
            <div className="flex gap-2 items-center">
              <Avatar>
                <AvatarFallback>
                  <span className="capitalize">
                    {user?.firstName.slice(0, 1)}
                    {user?.lastName.slice(0, 1)}
                  </span>
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="font-semibold">
                  {user?.firstName} {user?.lastName}
                </span>
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
  );
};

export default SideSheet;
