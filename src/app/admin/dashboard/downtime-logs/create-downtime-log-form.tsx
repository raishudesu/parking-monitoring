"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
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
import { toast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";
import { downtimeLogSchema } from "@/lib/zod";
import { useServerAction } from "zsa-react";
import { createDowntimeLogAction } from "./actions";

export default function DowntimeLogForm() {
  const { isPending, execute } = useServerAction(createDowntimeLogAction);

  const session = useSession();

  const form = useForm<z.infer<typeof downtimeLogSchema>>({
    resolver: zodResolver(downtimeLogSchema),
    defaultValues: {
      startedAt: "",
      endedAt: "",
      adminId: session.data?.user.id,
    },
  });

  async function onSubmit(values: z.infer<typeof downtimeLogSchema>) {
    try {
      const [data, err] = await execute(values);

      // Here you would typically send the downtimeLog to your API

      // Simulate API call

      if (err) {
        toast({
          title: "Error",
          description: "There was a problem submitting your downtime log.",
          variant: "destructive",
        });

        console.error("Error submitting downtime log:", err);
        return;
      }

      toast({
        title: "Downtime log submitted",
        description: "Your downtime log has been successfully recorded.",
      });

      form.reset();
    } catch (error) {
      console.error("Error submitting downtime log:", error);
      toast({
        title: "Error",
        description: "There was a problem submitting your downtime log.",
        variant: "destructive",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="startedAt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Time</FormLabel>
              <FormControl>
                <Input type="datetime-local" {...field} />
              </FormControl>
              <FormDescription>
                The time when the downtime started.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="endedAt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>End Time</FormLabel>
              <FormControl>
                <Input type="datetime-local" {...field} />
              </FormControl>
              <FormDescription>
                The time when the downtime ended.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending}>
          {isPending ? "Submitting..." : "Create"}
        </Button>
      </form>
    </Form>
  );
}
