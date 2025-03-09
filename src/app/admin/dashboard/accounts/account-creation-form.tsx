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
import { accountCreationSchema } from "@/lib/zod";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { createGpoAccountAction } from "./actions";
import { useServerAction } from "zsa-react";
import { generateSecurePassword } from "@/lib/utils";
import { College } from "@prisma/client";
import { useSession } from "next-auth/react";

const AccountCreationForm = ({ colleges }: { colleges: College[] }) => {
  const session = useSession();
  const { isPending, execute } = useServerAction(createGpoAccountAction);

  const isAdmin = session.data?.user.role === "ADMIN";

  const form = useForm<z.infer<typeof accountCreationSchema>>({
    resolver: zodResolver(accountCreationSchema),
    defaultValues: {
      email: "",
      gatePassNumber: "",
      password: "",
      accountType: "FACULTY",
      collegeId: undefined,
      isVIP: false,
      isPWD: false,
      department: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof accountCreationSchema>) => {
    values.password = generateSecurePassword(values.gatePassNumber);

    const [data, err] = await execute({
      auditAdminId: session.data?.user.id as string,
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
        title: "Account created successfully!",
        description: "Account details sent to the user.",
      });

      form.reset();
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
                  disabled={isAdmin || isPending}
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
                  disabled={isAdmin || isPending}
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
                  disabled={isAdmin || isPending}
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
                disabled={isAdmin || isPending}
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
                defaultValue={field.value as string | undefined}
                disabled={isAdmin || isPending}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select college affiliation" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="0">...</SelectItem>
                  {colleges.map(({ id, collegeName }) => (
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
                  disabled={isAdmin || isPending}
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
                  disabled={isAdmin || isPending}
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
                  disabled={isAdmin || isPending}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={isAdmin || isPending}
          className="w-full"
        >
          Create
        </Button>
      </form>
      {isAdmin && (
        <span className="text-destructive text-center font-bold">
          ACCESS DENIED
        </span>
      )}
    </Form>
  );
};

export default AccountCreationForm;
