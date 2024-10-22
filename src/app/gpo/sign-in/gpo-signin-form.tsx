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
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { gpoLoginSchema } from "@/lib/zod";

const GpoSignInForm = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof gpoLoginSchema>>({
    resolver: zodResolver(gpoLoginSchema),
    defaultValues: {
      email: "",
      plainTextPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof gpoLoginSchema>) => {
    try {
      // Cant use signIn in server-side because it is needed on the client to process tokens and sessions
      const res = await signIn("gpo", {
        email: values.email,
        plainTextPassword: values.plainTextPassword,
        redirect: false,
      });

      if (!res?.ok) {
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
        title: "Login success!",
        description: "Welcome to ParkSU",
      });

      router.push("/gpo/dashboard");
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
              <FormLabel>Corporate Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="w-full"
                  placeholder="parksu@psu.palawan.edu.ph"
                  type="email"
                  disabled={form.formState.isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="plainTextPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="w-full"
                  placeholder="Enter your password"
                  type="password"
                  disabled={form.formState.isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="self-stretch flex items-center justify-center gap-2"
          disabled={form.formState.isSubmitting}
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

export default GpoSignInForm;
