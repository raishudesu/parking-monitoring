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

const AdminSignInPage = () => {
  const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
  });

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    try {
      // Cant use signIn in server-side because it is needed on the client to process tokens and sessions
      const res = await signIn("admin", {
        email: values.email,
        password: values.password,
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

      toast({
        title: "Welcome Admin!",
        description: "Enjoy your session",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="w-full"
                  placeholder="Email"
                  type="text"
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
                  placeholder="Enter your password"
                  type="password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* {error && (
          <Alert variant="destructive">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Uh-oh, we couldn&apos;t log you in</AlertTitle>
            <AlertDescription>{error.message}</AlertDescription>
          </Alert>
        )} */}

        {/* <LoaderButton isLoading={isPending} className="w-full" type="submit">
          Sign In
        </LoaderButton> */}
        <button type="submit">Admin Sign in</button>
      </form>
    </Form>
  );
};

export default AdminSignInPage;
