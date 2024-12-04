"use client";

import { toast } from "@/components/ui/use-toast";
import { Path, useFieldArray, useForm } from "react-hook-form";
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
import { driverBehaviorReportSchema } from "@/lib/zod";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useServerAction } from "zsa-react";
import { Textarea } from "@/components/ui/textarea";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Loader2, X } from "lucide-react";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { deleteImage, getPublicUrl, uploadImage } from "@/hooks/supabase";
import { ReportType } from "@prisma/client";
import { submitReportAction } from "./actions";

type DriverBehaviorReport = z.infer<typeof driverBehaviorReportSchema>;

type ParkingSpaceOptions = {
  id: string;
  name: string;
};

const ReportForm = ({
  parkingSpaceOptions,
}: {
  parkingSpaceOptions: ParkingSpaceOptions[];
}) => {
  const [uploadingFields, setUploadingFields] = useState<
    Record<string, boolean>
  >({});
  const session = useSession();

  const { isPending, execute } = useServerAction(submitReportAction);

  const form = useForm<DriverBehaviorReport>({
    resolver: zodResolver(driverBehaviorReportSchema),
    defaultValues: {
      reportedByAccountId: session?.data?.user.id, // Replace with actual account ID
      parkingSpaceId: undefined, // Replace with actual parking space ID
      reportType: undefined,
      otherDescription: "",
      images: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "images",
  });

  const onSubmit = async (
    values: z.infer<typeof driverBehaviorReportSchema>
  ) => {
    // console.log(values);
    try {
      // const newValues: z.infer<typeof parkingSpaceSchema> = {
      //   ...values,
      //   maxCapacity: parseInt(values.maxCapacity, 10),
      //   reservedCapacity: parseInt(values.reservedCapacity, 10),
      //   auditAdminId: session.data?.user.id,
      // };

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

        console.log(err);
      }

      if (data) {
        toast({
          title: "Report submitted!",
          description: "Your report submission will be reviewed by our admins.",
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

  const handleFileUpload = async (
    file: File,
    fieldName: Path<z.infer<typeof driverBehaviorReportSchema>>
  ) => {
    setUploadingFields((prev) => ({ ...prev, [fieldName]: true }));
    try {
      const path = "images";

      const result = await uploadImage(file, path);

      if (result) {
        // console.log(result);
        const publicUrl = getPublicUrl(result.path);

        form.setValue(fieldName, {
          url: publicUrl.data.publicUrl,
          path: result.path,
        });

        // console.log(form.getValues("images"));

        toast({
          title: "File uploaded successfully",
          description: "The image has been uploaded to Supabase storage.",
        });
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      toast({
        title: "Upload failed",
        description: "There was an error uploading the file. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploadingFields((prev) => ({ ...prev, [fieldName]: false }));
    }
  };

  const handleRemoveImage = async (index: number) => {
    const formField = form.getValues("images");

    const images = formField[index];

    if (images && images.url) {
      const deleted = await deleteImage(images.path);
      if (deleted) {
        form.resetField(`images.${index}`);
        toast({
          title: "Image removed",
          description: "The image has been removed from storage.",
        });
        remove(index);
      } else {
        toast({
          title: "Error",
          description: "Failed to remove the image. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const handleRemoveImageField = async (index: number) => {
    await handleRemoveImage(index);
    remove(index);
  };

  const reportTypeValues = Object.values(ReportType);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="h-full space-y-6 p-2"
      >
        <FormField
          control={form.control}
          name="reportType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What happened?</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={isPending}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Reports" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {reportTypeValues.map((value, index) => (
                    <SelectItem key={index} value={value}>
                      {String(value).replace(/_/g, " ")}
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
          name="otherDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kindly describe the issue:</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  className="w-full"
                  placeholder="Describe the issue"
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="parkingSpaceId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Where did this happen?</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={isPending}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Parking Space" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {parkingSpaceOptions.map((value, index) => (
                    <SelectItem key={index} value={value.id}>
                      {value.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {fields.map((field, index) => (
          <div key={field.id} className="mt-6 flex flex-col gap-6">
            <FormField
              control={form.control}
              name={`images.${index}.url`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">
                    Include Picture for Additional Evidence
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            handleFileUpload(file, `images.${index}` as const);
                          }
                        }}
                        disabled={uploadingFields[`images.${index}`]}
                      />
                      {uploadingFields[`images.${index}`] && (
                        <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                        </div>
                      )}
                    </div>
                  </FormControl>

                  <FormMessage />
                  <div>
                    {field.value && (
                      <div className="relative mt-2">
                        <AspectRatio ratio={16 / 9}>
                          <Image
                            src={field.value as string}
                            alt="parking-image"
                            className="rounded-md object-cover"
                            fill
                          />
                        </AspectRatio>
                        <Button
                          type="button"
                          variant="secondary"
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={() => handleRemoveImage(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </FormItem>
              )}
            />
            <Button
              type="button"
              variant="secondary"
              onClick={() => handleRemoveImageField(index)}
              className="text-destructive self-start"
            >
              Remove Image
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="secondary"
          onClick={() =>
            append({
              url: "",
              path: "",
            })
          }
          className="mt-4 self-start"
        >
          Add Image
        </Button>

        <Button
          type="submit"
          disabled={isPending || Object.values(uploadingFields).some(Boolean)}
          className="w-full"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default ReportForm;
