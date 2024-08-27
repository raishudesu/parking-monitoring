"use client";

import { BadgeCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ScanSuccess = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the desired page after 3 seconds
    const timer = setTimeout(() => {
      router.push("/gpo/dashboard"); // Change '/desired-page' to your target route
    }, 3000);

    // Cleanup the timer on component unmount
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="text-center w-full h-full flex flex-col gap-12 justify-center items-center">
      <div className="">
        <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl">
          Parking Session Started
        </h1>
        <p className="leading-7 [&:not(:first-child)]:mt-6 text-muted-foreground">
          Your parking in *parking name* has started.
        </p>
      </div>
      <BadgeCheck size={200} className="text-green-500" />
    </div>
  );
};

export default ScanSuccess;
