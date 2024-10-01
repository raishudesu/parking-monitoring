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
import { parkingSpaceFormSchema, parkingSpaceSchema } from "@/lib/zod";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useServerAction } from "zsa-react";
import { createParkingSpaceAction } from "./actions";
import { Textarea } from "@/components/ui/textarea";
import { useSession } from "next-auth/react";

const ParkingSpaceCreationForm = () => {
  const session = useSession();

  const { isPending, execute } = useServerAction(createParkingSpaceAction);

  const form = useForm<z.infer<typeof parkingSpaceFormSchema>>({
    resolver: zodResolver(parkingSpaceFormSchema),
    defaultValues: {
      name: "",
      description: "",
      longitude: "",
      latitude: "",
      spaceType: "FOURWHEEL",
      maxCapacity: "",
      imageUrl: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof parkingSpaceFormSchema>) => {
    try {
      const newValues: z.infer<typeof parkingSpaceSchema> = {
        ...values,
        maxCapacity: parseInt(values.maxCapacity, 10),
        auditAdminId: session.data?.user.id,
      };

      const [data, err] = await execute(newValues);

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
          title: "Parking space added successfully!",
          description: "A new parking space is added.",
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Parking Space Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="w-full"
                  placeholder="CS1"
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
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  className="w-full"
                  placeholder="Describe the Parking Space"
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="longitude"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Longitude</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="w-full"
                  placeholder="Enter longitude"
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="latitude"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Latitude</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="w-full"
                  placeholder="Enter Latitude"
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="spaceType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Space Type</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={isPending}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Parking Space Type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="MOTORCYCLE">MOTORCYCLE</SelectItem>
                  <SelectItem value="TRICYCLE">TRICYCLE</SelectItem>
                  <SelectItem value="FOURWHEEL">FOURWHEEL</SelectItem>
                  <SelectItem value="HYBRID">HYBRID</SelectItem>
                  <SelectItem value="PWD">PWD</SelectItem>
                  <SelectItem value="VIP">VIP</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="maxCapacity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Max Capacity</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="w-full"
                  placeholder="Enter Max Capacity"
                  type="number"
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending}>
          Create
        </Button>
      </form>
    </Form>
  );
};

export default ParkingSpaceCreationForm;
