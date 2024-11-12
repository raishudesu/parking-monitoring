"use client";

import { toast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { visitorCardCreationSchema } from "@/lib/zod";
import { Button } from "@/components/ui/button";
import { useServerAction } from "zsa-react";
import { useSession } from "next-auth/react";
import { Dispatch, SetStateAction } from "react";
import { createVisitorCardAction } from "./actions";

const VisitorCardCreationForm = ({
  setOpen,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const session = useSession();
  const { isPending, execute } = useServerAction(createVisitorCardAction);

  const form = useForm<z.infer<typeof visitorCardCreationSchema>>({
    resolver: zodResolver(visitorCardCreationSchema),
    defaultValues: {
      cardNumber: "",
      auditAdminId: session.data?.user.id,
    },
  });

  const onSubmit = async (
    values: z.infer<typeof visitorCardCreationSchema>
  ) => {
    try {
      const [data, err] = await execute(values);

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
          description: "A new college has been created.",
        });

        form.reset();
        setOpen(false);
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="h-full space-y-6">
        <FormField
          control={form.control}
          name="cardNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Card ID</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="w-full"
                  placeholder="e.g 25"
                  type="text"
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending} className="w-full">
          Create
        </Button>
      </form>
    </Form>
  );
};

export default VisitorCardCreationForm;
