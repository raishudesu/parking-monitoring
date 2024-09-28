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
    <div className="text-center w-full h-full flex flex-col gap-6 items-center mt-12">
      <BadgeCheck size={200} className="text-green-500" />
      <div className="">
        <h1 className="scroll-m-20 text-xl md:text-3xl font-extrabold tracking-tight lg:text-4xl">
          Parking Session Started
        </h1>
        <p className="leading-7 [&:not(:first-child)]:mt-6 text-muted-foreground">
          Remember to end your session on time!
        </p>
      </div>
    </div>
  );
};

export default ScanSuccess;
