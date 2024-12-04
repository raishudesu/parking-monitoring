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
import { collegeCreationSchema, updateCreditScoreSchema } from "@/lib/zod";
import { Button } from "@/components/ui/button";
import { useServerAction } from "zsa-react";
import { useSession } from "next-auth/react";
import { Dispatch, SetStateAction } from "react";
import { updateCreditScoreAction } from "../actions";

const UpdateCreditScoreForm = ({
  userId,
  creditScore,
  setOpen,
}: {
  userId: string;
  creditScore: number;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const session = useSession();
  const { isPending, execute } = useServerAction(updateCreditScoreAction);

  const isAdmin = session.data?.user.role === "ADMIN";

  const form = useForm<z.infer<typeof updateCreditScoreSchema>>({
    resolver: zodResolver(updateCreditScoreSchema),
    defaultValues: {
      userId: userId,
      creditScore: creditScore.toString(),
      adminId: session.data?.user.id,
    },
  });

  const onSubmit = async (values: z.infer<typeof updateCreditScoreSchema>) => {
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
          description: "Credit score updated successfully",
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
          name="creditScore"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Credit Score</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="w-full"
                  placeholder="Enter new credit score"
                  type="number"
                  disabled={isAdmin || isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending} className="w-full">
          Save
        </Button>
      </form>
    </Form>
  );
};

export default UpdateCreditScoreForm;
