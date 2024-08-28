"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const ToScanBtn = () => {
  const router = useRouter();
  return (
    <Button
      onClick={() => router.push("/gpo/dashboard/scan")}
      className="self-stretch lg:self-start"
    >
      Start Parking
    </Button>
  );
};

export default ToScanBtn;
