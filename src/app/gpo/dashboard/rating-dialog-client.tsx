"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { useServerAction } from "zsa-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { submitRatingAction } from "./actions";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { ratingSchema } from "@/schemas/parking-session-rating";
import { useRouter } from "next/navigation";
import { StarRating } from "@/components/star-rating";

const RatingDialogClient = ({ sessionId }: { sessionId: string }) => {
  const { isPending, execute } = useServerAction(submitRatingAction);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);

  const form = useForm<z.infer<typeof ratingSchema>>({
    resolver: zodResolver(ratingSchema),
    defaultValues: {
      sessionId: sessionId,
      rating: 5,
    },
  });

  const onSubmit = async (values: z.infer<typeof ratingSchema>) => {
    try {
      const [data, err] = await execute(values);

      if (err) {
        toast({
          title: "Oops... Something went wrong",
          description: "Try again later",
          variant: "destructive",
        });
        console.error(err);
        return;
      }

      toast({
        title: "Rating submitted successfully",
        description: "Thank you for your valuable feedback!",
      });

      // Clear the rating dialog cookie
      await fetch("/api/clear-rating-dialog", { method: "POST" });

      router.refresh();
      setIsOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem submitting your feedback.",
        variant: "destructive",
      });
      console.error(error);
    }
  };

  const handleOpenChange = async (open: boolean) => {
    if (!open) {
      // Clear the rating dialog cookie when manually closed
      await fetch("/api/clear-rating-dialog", { method: "POST" });
      setIsOpen(false);
      router.refresh();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>How was your parking experience?</DialogTitle>
          <DialogDescription>
            This rating will help us improve our services and overall parking
            experience.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center gap-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="sessionId"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} value={sessionId} className="hidden" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rate your parking experience</FormLabel>
                    <FormControl>
                      <Controller
                        name="rating"
                        control={form.control}
                        render={({ field }) => (
                          <StarRating
                            rating={field.value}
                            onRatingChange={(rating) => field.onChange(rating)}
                          />
                        )}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Feedback"
                )}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RatingDialogClient;
