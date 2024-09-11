"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const SignOutBtn = () => {
  const router = useRouter();
  const session = useSession();

  const handleSignOut = async () => {
    try {
      await signOut({ redirect: false });

      if (session.data?.user.role === "GPO") {
        router.replace("/gpo/sign-in");
        return;
      }

      router.replace("/admin/sign-in");
    } catch (error) {
      console.error("Sign out failed:", error);

      toast({
        title: "Sign out failed",
        variant: "destructive",
        description: "Please try again later.",
      });
    }
  };
  return (
    <Button variant={"secondary"} onClick={handleSignOut}>
      Sign Out
    </Button>
  );
};

export default SignOutBtn;
