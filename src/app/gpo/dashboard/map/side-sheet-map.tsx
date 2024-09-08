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

const SideSheetMap = () => {
  const [open, setOpen] = useState(false);

  return (
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
  );
};

export default SideSheetMap;
