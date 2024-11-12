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
import { collegeCreationSchema, collegeSchema } from "@/lib/zod";
import { Button } from "@/components/ui/button";
import { useServerAction } from "zsa-react";
import { updateCollegeAction } from "./actions";
import { useSession } from "next-auth/react";

const CollegeUpdateForm = ({
  id: collegeId,
  collegeName,
}: z.infer<typeof collegeSchema>) => {
  const session = useSession();

  const { isPending, execute } = useServerAction(updateCollegeAction);

  const form = useForm<z.infer<typeof collegeCreationSchema>>({
    resolver: zodResolver(collegeCreationSchema),
    defaultValues: {
      collegeName: collegeName,
    },
  });

  const onSubmit = async (values: z.infer<typeof collegeCreationSchema>) => {
    try {
      const [data, err] = await execute({
        auditAdminId: session.data?.user.id as string,
        collegeId,
        collegeName: values.collegeName,
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
          description: "College updated successfully.",
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="h-full space-y-6">
        <FormField
          control={form.control}
          name="collegeName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>College Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="w-full"
                  placeholder="e.g CS"
                  type="text"
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending} className="w-full">
          Update
        </Button>
      </form>
    </Form>
  );
};

export default CollegeUpdateForm;
