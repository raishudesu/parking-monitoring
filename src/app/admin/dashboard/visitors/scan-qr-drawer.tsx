"use client";

import * as React from "react";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ScanLine } from "lucide-react";
import QrReader from "./qr-reader";
import { Button } from "@/components/ui/button";

const ScanQrDrawer = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <div className="py-6 w-full h-full bg-background border border-primary hover:bg-slate-100 dark:hover:bg-zinc-900 ease-in-out transition-colors rounded-xl flex flex-col gap-6 justify-center items-center">
          <ScanLine size={100} className="text-primary" />
          <span className="text-xl font-bold">Scan Visitor Pass</span>
        </div>
        {/* <Button className="flex gap-2">
          <ScanLine size={18} />
          Scan QR
        </Button> */}
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Scan Visitor Pass QR</DrawerTitle>
            <DrawerDescription>
              Place the QR code inside the frame to scan.
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="flex items-center justify-center space-x-2">
              <QrReader setOpen={setOpen} />
            </div>
          </div>
          <DrawerFooter></DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default ScanQrDrawer;
