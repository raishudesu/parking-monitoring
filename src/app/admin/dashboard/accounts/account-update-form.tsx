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
import { accountCreationSchema, gpoUpdateAccountSchema } from "@/lib/zod";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { updateGpoAccountAction } from "./actions";
import { useServerAction } from "zsa-react";
import { generateSecurePassword } from "@/lib/utils";
import emailjs from "@emailjs/browser";
import { useSession } from "next-auth/react";

const sendUpdatedDetailsToGpoEmail = async (
  email: string,
  gatePassNumber: string,
  password: string
) => {
  try {
    const emailRes = await emailjs.send(
      process.env.NEXT_PUBLIC_SERVICE_KEY as string,
      process.env.NEXT_PUBLIC_TEMPLATE_ID as string,
      { to: email, gatePassNumber, password },
      process.env.NEXT_PUBLIC_EMAILJS_API_KEY
    );

    return emailRes;
  } catch (error) {
    throw new Error(error as string);
  }
};

const AccountUpdateForm = ({
  accountId,
  data,
  colleges,
}: z.infer<typeof gpoUpdateAccountSchema>) => {
  const session = useSession();
  const { isPending, execute } = useServerAction(updateGpoAccountAction);

  const form = useForm<z.infer<typeof accountCreationSchema>>({
    resolver: zodResolver(accountCreationSchema),
    defaultValues: {
      email: data.email,
      gatePassNumber: data.gatePassNumber,
      password: data.password,
      accountType: data.accountType,
      collegeId: data.collegeId?.toString(),
      isVIP: data.isVIP,
      isPWD: data.isPWD,
      department: data.department,
    },
  });

  const onSubmit = async (values: z.infer<typeof accountCreationSchema>) => {
    values.password = generateSecurePassword(values.gatePassNumber);

    const [data, err] = await execute({
      auditAdminId: session.data?.user.id,
      accountId,
      data: values,
    });

    if (err) {
      const parsedErrorData = await JSON.parse(err?.data);

      if (parsedErrorData.code === "P2002") {
        // Handle unique constraint violation
        const target = parsedErrorData.meta?.target as [];

        toast({
          title: "Something went wrong.",
          variant: "destructive",
          description: `Unique constraint failed on the fields: ${
            target ? target.join(", ") : "unknown"
          }`,
        });

        console.error(
          `Unique constraint failed on the fields: ${
            target ? target.join(", ") : "unknown"
          }`
        );
      }
    }

    if (data) {
      toast({
        title: "Account updated successfully!",
        description: "Account details sent to the user.",
      });

      form.reset();

      const res = await sendUpdatedDetailsToGpoEmail(
        data?.email as string,
        data?.gatePassNumber as string,
        values.password
      );

      console.log(res);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="h-full space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Corporate Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="w-full"
                  placeholder="e.g 2020-6-6969@psu.palawan.edu.ph"
                  type="text"
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gatePassNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gate Pass Number</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="w-full"
                  placeholder="e.g GP-2024-6969"
                  type="text"
                  disabled={isPending}
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
              {/* <FormLabel>Password</FormLabel> */}
              <FormControl>
                <Input
                  {...field}
                  className="w-full"
                  placeholder="Enter your password"
                  type="hidden"
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="accountType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account Type</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={isPending}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Account Type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="FACULTY">FACULTY</SelectItem>
                  <SelectItem value="STUDENT">STUDENT</SelectItem>
                  <SelectItem value="STAFF">STAFF</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="collegeId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>College</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={isPending}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select college affiliation" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="0">...</SelectItem>
                  {colleges?.map(({ id, collegeName }) => (
                    <SelectItem key={id} value={id.toString()}>
                      {collegeName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="department"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Department</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="w-full"
                  placeholder="e.g. College of Sciences"
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isVIP"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">isVIP?</FormLabel>
                <FormDescription>
                  Enable if the account owner is VIP.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={isPending}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isPWD"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">isPWD?</FormLabel>
                <FormDescription>
                  Enable if the account owner is a PWD.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={isPending}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending}>
          Update
        </Button>
      </form>
    </Form>
  );
};

export default AccountUpdateForm;
