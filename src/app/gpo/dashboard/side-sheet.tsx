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

const SideSheet = () => {
  const [open, setOpen] = useState(false);
  const path = usePathname();

  if (path === "/gpo/dashboard/map") return null;

  return (
    <div className="p-6 pb-3 md:hidden">
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
          <ul className="flex flex-col gap-3">
            <NavLinks open={open} setOpen={setOpen} />
          </ul>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default SideSheet;
