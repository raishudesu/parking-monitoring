"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

const SignOutBtn = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut({ redirect: false });

      router.replace("/gpo/sign-in");
    } catch (error) {
      console.error("Sign out failed:", error);

      toast({
        title: "Sign out failed",
        variant: "destructive",
        description: "Please try again later.",
      });
    }
  };
  return <Button onClick={handleSignOut}>Sign out</Button>;
};

export default SignOutBtn;
