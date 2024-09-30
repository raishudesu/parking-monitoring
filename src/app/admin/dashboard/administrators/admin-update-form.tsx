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
import { adminAccountSchema, adminUpdateSchema } from "@/lib/zod";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useServerAction } from "zsa-react";
import { updateAdminAction } from "./actions";
import { Dispatch, SetStateAction } from "react";
import { useSession } from "next-auth/react";

const AdminUpdateForm = ({
  adminId,
  adminData,
  setOpen,
}: {
  adminId: string;
  adminData: z.infer<typeof adminUpdateSchema>;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const session = useSession();
  const { isPending, execute } = useServerAction(updateAdminAction);

  const isAdmin = session.data?.user.role === "ADMIN";

  const form = useForm<z.infer<typeof adminUpdateSchema>>({
    resolver: zodResolver(adminUpdateSchema),
    disabled: isAdmin || isPending,
    defaultValues: {
      auditAdminId: session.data?.user.id,
      firstName: adminData.firstName,
      lastName: adminData.lastName,
      corpEmail: adminData.corpEmail,
      //   password: "",
      role: adminData.role,
    },
  });

  const onSubmit = async (values: z.infer<typeof adminUpdateSchema>) => {
    try {
      const [data, err] = await execute({ adminId, data: values });

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
          description: "Admin details updated successfully.",
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
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="w-full"
                  placeholder="John"
                  type="text"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="w-full"
                  placeholder="Doe"
                  type="text"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="corpEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Corporate Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="w-full"
                  type="email"
                  placeholder="e.g 202180386@psu.palawan.edu.ph"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={isPending || isAdmin}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Account Type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="ADMIN">ADMIN</SelectItem>
                  <SelectItem value="SUPERADMIN">SUPERADMIN</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending || isAdmin}>
          Update
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

export default AdminUpdateForm;
