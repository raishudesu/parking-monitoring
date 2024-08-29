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
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { useServerAction } from "zsa-react";
import { updateGpoPasswordAction } from "./actions";

export const changePasswordSchema = z.object({
  oldPassword: z.string(),
  newPassword: z.string(),
});

const ChangePasswordForm = () => {
  const session = useSession();

  const { isPending, execute } = useServerAction(updateGpoPasswordAction);

  const form = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof changePasswordSchema>) => {
    try {
      const [data, err] = await execute({
        accountId: session?.data?.user.id as string,
        newPassword: values.newPassword,
        oldPassword: values.oldPassword,
      });

      if (err) {
        let errorMessage = "An unknown error occurred";
        if (typeof err.data === "string") {
          try {
            const parsedErrorData = JSON.parse(err.data);
            errorMessage =
              parsedErrorData.message || JSON.stringify(parsedErrorData);
          } catch (parseError) {
            console.error("Error parsing error data:", parseError);
            errorMessage = err.data;
          }
        } else if (err.data && typeof err.data === "object") {
          errorMessage = JSON.stringify(err.data);
        }

        toast({
          title: "Something went wrong.",
          variant: "destructive",
          description: err.message || "Try again later.",
        });
      }

      if (data) {
        toast({
          title: "Success!",
          description: "Password updated successfully.",
        });
        form.reset();
      }
    } catch (error: any) {
      toast({
        title: "Something went wrong.",
        variant: "destructive",
        description: error.message || "Try again later",
      });
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
          name="oldPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Old Password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="w-full"
                  placeholder="Enter your old password"
                  type="password"
                  disabled={form.formState.isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="w-full"
                  placeholder="Enter your new password"
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
          className="self-stretch md:self-start flex items-center justify-center gap-2"
          disabled={form.formState.isSubmitting}
        >
          <LoaderCircle
            size={18}
            className={`${
              form.formState.isSubmitting ? "flex" : "hidden"
            } animate-spin`}
          />
          Update
        </Button>
      </form>
    </Form>
  );
};

export default ChangePasswordForm;
