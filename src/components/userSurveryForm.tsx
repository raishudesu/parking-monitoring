"use client";

import { useState } from "react";
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

const parkingFeedbackSchema = z.object({
  overallExperience: z.enum([
    "Excellent",
    "Good",
    "Neutral",
    "Poor",
    "Very Poor",
  ]),
  easeOfUse: z.enum([
    "Very Easy",
    "Easy",
    "Neutral",
    "Difficult",
    "Very Difficult",
  ]),
  realtimeFeatures: z.enum([
    "Very Helpful",
    "Helpful",
    "Neutral",
    "Not Helpful",
    "Not At All Helpful",
  ]),
  qrFunctionality: z.enum([
    "Yes, it worked perfectly.",
    "It was okay, but could be improved.",
    "No, I faced issues.",
  ]),
  notifications: z.enum([
    "Yes, they were timely and clear.",
    "Somewhat, but improvements are needed.",
    "No, I missed or didn't understand the notifications.",
  ]),
  suggestions: z
    .string()
    .min(1, "Please provide your suggestions")
    .max(500, "Suggestion is too long"),
  likelyToRecommend: z.enum([
    "Very Likely",
    "Likely",
    "Neutral",
    "Unlikely",
    "Very Unlikely",
  ]),
});

const ParkingSystemSurvey = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof parkingFeedbackSchema>>({
    resolver: zodResolver(parkingFeedbackSchema),
    defaultValues: {
      overallExperience: undefined,
      easeOfUse: undefined,
      realtimeFeatures: undefined,
      qrFunctionality: undefined,
      notifications: undefined,
      suggestions: "",
      likelyToRecommend: undefined,
    },
  });

  const onSubmit = async (data: z.infer<typeof parkingFeedbackSchema>) => {
    setIsSubmitting(true);
    try {
      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log(data);
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
    } finally {
      setIsSubmitting(false);
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
              defaultValue={field.value}
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
            {renderRadioGroup(
              "overallExperience",
              "1. How would you rate your overall experience with the parking monitoring system?",
              ["Excellent", "Good", "Neutral", "Poor", "Very Poor"]
            )}

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
              "notifications",
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

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
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
