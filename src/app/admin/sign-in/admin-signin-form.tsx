"use client";

import { toast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signIn, SignInResponse } from "next-auth/react";
import { loginSchema } from "@/lib/zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

const AdminSignInForm = () => {
  const [loginStatus, setLoginStatus] = useState<SignInResponse | undefined>(
    undefined
  );
  const [showPwd, setShowPwd] = useState<boolean>(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onShowPassword = () => {
    setShowPwd(!showPwd);
  };

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    try {
      // Cant use signIn in server-side because it is needed on the client to process tokens and sessions
      const res = await signIn("admin", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (res?.error) {
        toast({
          title: "Something went wrong",
          description: res?.error,
          variant: "destructive",
        });
        return;
      }

      // searchParams ? router.push(searchParams) : router.push("/projects");

      form.reset();

      toast({
        title: "Log in success!",
        description: "Welcome admin!",
      });

      setLoginStatus(res);

      router.push("/admin/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-col space-y-6"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Admin Corporate Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="w-full"
                  placeholder="e.g administrator@psu.palawan.edu.ph"
                  type="text"
                  disabled={form.formState.isSubmitting}
                  autoFocus
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="w-full"
                  placeholder="Admin Password"
                  type={showPwd ? "text" : "password"}
                  disabled={form.formState.isSubmitting}
                  // prevent user on pasting
                  onPaste={(e) => {
                    e.preventDefault();
                    return false;
                  }}
                />
              </FormControl>
              <FormMessage />
              <div className="pt-2 flex gap-2 items-center">
                <Checkbox onCheckedChange={onShowPassword} />
                <small className="text-sm text-muted-foreground">
                  Show Password
                </small>
              </div>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="self-stretch flex items-center justify-center gap-2"
          disabled={form.formState.isSubmitting || loginStatus?.ok}
        >
          <LoaderCircle
            size={18}
            className={`${
              form.formState.isSubmitting ? "flex" : "hidden"
            } animate-spin`}
          />
          Login
        </Button>
      </form>
    </Form>
  );
};

export default AdminSignInForm;
