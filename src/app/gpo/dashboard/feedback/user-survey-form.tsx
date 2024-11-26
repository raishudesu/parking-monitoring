"use client";

import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { Controller, useForm } from "react-hook-form";
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
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { parkingFeedbackSchema } from "@/lib/zod";
import { useServerAction } from "zsa-react";
import { submitSurveyAction } from "@/app/gpo/dashboard/feedback/actions";
import { useSession } from "next-auth/react";
import { StarRating } from "@/app/gpo/dashboard/feedback/star-rating";

const ParkingSystemSurvey = () => {
  const session = useSession();
  const { isPending, execute } = useServerAction(submitSurveyAction);

  const form = useForm<z.infer<typeof parkingFeedbackSchema>>({
    resolver: zodResolver(parkingFeedbackSchema),
    defaultValues: {
      overallExperience: undefined,
      easeOfUse: undefined,
      realtimeFeatures: undefined,
      qrFunctionality: undefined,
      notificationFeedback: undefined,
      suggestions: "",
      likelyToRecommend: undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof parkingFeedbackSchema>) => {
    try {
      const [data, err] = await execute({
        userId: session.data?.user.id ?? undefined,
        ...values,
      });

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
        title: "Feedback Submitted",
        description: "Thank you for your valuable feedback!",
      });
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem submitting your feedback.",
        variant: "destructive",
      });
      console.error(error);
    }
  };

  const renderRadioGroup = (
    name: keyof z.infer<typeof parkingFeedbackSchema>,
    label: string,
    options: string[]
  ) => (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={String(field.value)}
              className="flex flex-col space-y-1"
            >
              {options.map((option) => (
                <div key={option} className="flex items-center space-x-3">
                  <RadioGroupItem value={option} id={`${name}-${option}`} />
                  <Label htmlFor={`${name}-${option}`}>{option}</Label>
                </div>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          User Feedback Survey
        </CardTitle>
        <CardDescription className="text-center">
          We value your feedback to improve our parking monitoring system.
          Please take a moment to answer the following questions:
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="overallExperience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    1. How would you rate your overall experience with the
                    parking monitoring system?
                  </FormLabel>
                  <FormControl>
                    <Controller
                      name="overallExperience"
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

            {renderRadioGroup(
              "easeOfUse",
              "2. How easy was it to navigate the system and find a parking space?",
              ["Very Easy", "Easy", "Neutral", "Difficult", "Very Difficult"]
            )}

            {renderRadioGroup(
              "realtimeFeatures",
              "3. How helpful were the real-time parking updates and notifications?",
              [
                "Very Helpful",
                "Helpful",
                "Neutral",
                "Not Helpful",
                "Not At All Helpful",
              ]
            )}

            {renderRadioGroup(
              "qrFunctionality",
              "4. Was scanning the QR code to start your parking session convenient?",
              [
                "Yes, it worked perfectly.",
                "It was okay, but could be improved.",
                "No, I faced issues.",
              ]
            )}

            {renderRadioGroup(
              "notificationFeedback",
              "5. Did the session reminders and end-time notifications meet your expectations?",
              [
                "Yes, they were timely and clear.",
                "Somewhat, but improvements are needed.",
                "No, I missed or didn't understand the notifications.",
              ]
            )}

            <FormField
              control={form.control}
              name="suggestions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    6. What features or changes would you like to see in the
                    parking monitoring system?
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Your feedback helps us grow!"
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {renderRadioGroup(
              "likelyToRecommend",
              "7. How likely are you to recommend this parking monitoring system to others?",
              ["Very Likely", "Likely", "Neutral", "Unlikely", "Very Unlikely"]
            )}

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
      </CardContent>
    </Card>
  );
};

export default ParkingSystemSurvey;
