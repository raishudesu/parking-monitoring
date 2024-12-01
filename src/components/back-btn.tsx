"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const BackBtn = () => {
  const router = useRouter();
  const pathname = usePathname();

  if (pathname === "/admin/dashboard" || pathname === "/gpo/dashboard")
    return null;

  return (
    <Button
      variant={"ghost"}
      className="flex gap-2 items-center"
      onClick={() => router.back()}
    >
      <ArrowLeft />
      Go Back
    </Button>
  );
};

export default BackBtn;
