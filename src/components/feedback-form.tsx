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
import { userFeedBackSchema } from "@/lib/zod";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { useServerAction } from "zsa-react";
import { createUserFeedbackAction } from "@/app/actions";
import { Textarea } from "./ui/textarea";

const FeedbackForm = () => {
  const { isPending, isSuccess, execute } = useServerAction(
    createUserFeedbackAction
  );

  const form = useForm<z.infer<typeof userFeedBackSchema>>({
    resolver: zodResolver(userFeedBackSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof userFeedBackSchema>) => {
    try {
      const [data, err] = await execute(values);

      if (err) {
        toast({
          title: "Something went wrong",
          description: err.message || "Try again later",
          variant: "destructive",
        });
        return;
      }

      // searchParams ? router.push(searchParams) : router.push("/projects");

      if (data) {
        toast({
          title: "Form submitted!",
          description:
            "We will review your feedback and reach out to you in a while.",
        });
        form.reset();
      }
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="w-full"
                  placeholder="John Doe"
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Email</FormLabel>
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
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Message</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  className="w-full"
                  placeholder="Your message here"
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
          disabled={isPending}
        >
          <LoaderCircle
            size={18}
            className={`${
              form.formState.isSubmitting ? "flex" : "hidden"
            } animate-spin`}
          />
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default FeedbackForm;
