"use client";

import { toast } from "@/components/ui/use-toast";
import { Path, useFieldArray, useForm } from "react-hook-form";
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
import { updateParkingSpaceAction } from "./actions";
import { Textarea } from "@/components/ui/textarea";
import { Dispatch, SetStateAction, useState } from "react";
import { useSession } from "next-auth/react";
import MapPicker from "./map-picker";
import MapPolygonCreator from "./map-polygon-creator";
import { useGoogleMaps } from "@/providers/google-maps-provider";
import { Loader2, X } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import {
  deleteImage,
  deleteParkingImage,
  getPublicUrl,
  uploadImage,
} from "@/hooks/supabase";

const ParkingSpaceUpdateForm = ({
  parkingSpaceId,
  data,
  setOpen,
}: {
  parkingSpaceId: string;
  data: z.infer<typeof parkingSpaceFormSchema>;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  // const { isLoaded } = useJsApiLoader({
  //   id: "google-map-script",
  //   googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  // });
  const { isLoaded, loadError } = useGoogleMaps();
  const [uploadingFields, setUploadingFields] = useState<
    Record<string, boolean>
  >({});

  const session = useSession();

  const { isPending, execute } = useServerAction(updateParkingSpaceAction);

  const form = useForm<z.infer<typeof parkingSpaceFormSchema>>({
    resolver: zodResolver(parkingSpaceFormSchema),
    defaultValues: {
      name: data.name,
      description: data.description,
      longitude: data.longitude,
      latitude: data.latitude,
      spaceType: data.spaceType,
      maxCapacity: data.maxCapacity,
      polygon: data.polygon,
      images: data.images,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "images",
  });

  const handleLocationPicked = (lat: number, lng: number) => {
    form.setValue("latitude", lat.toString());
    form.setValue("longitude", lng.toString());
  };

  const onSubmit = async (values: z.infer<typeof parkingSpaceFormSchema>) => {
    try {
      const newValues: z.infer<typeof parkingSpaceSchema> = {
        ...values,
        maxCapacity: parseInt(values.maxCapacity, 10),
        auditAdminId: session.data?.user.id,
      };

      const [data, err] = await execute({ parkingSpaceId, data: newValues });

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
          description: "Parking space updated successfully.",
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

  const handleFileUpload = async (
    file: File,
    fieldName: Path<z.infer<typeof parkingSpaceFormSchema>>
  ) => {
    setUploadingFields((prev) => ({ ...prev, [fieldName]: true }));
    try {
      const path = "images";

      const result = await uploadImage(file, path);

      if (result) {
        const publicUrl = getPublicUrl(result.path);

        form.setValue(fieldName, {
          url: publicUrl.data.publicUrl,
          path: result.path,
        });

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
      const deletedImageRow = await deleteParkingImage(images.id as string);
      console.log(deletedImageRow);
      console.log(deleted);
      if (deleted) {
        form.setValue(`images.${index}.url`, "");
        toast({
          title: "Image removed",
          description: "The image has been removed from storage.",
        });
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
        <FormItem>
          <FormLabel>Location</FormLabel>
          <MapPicker
            onLocationPicked={handleLocationPicked}
            isLoaded={isLoaded}
          />
        </FormItem>
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
                  readOnly
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
                  readOnly
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormItem>
          <FormLabel>Polygon </FormLabel>
          <MapPolygonCreator
            onLocationPicked={handleLocationPicked}
            onPolygonComplete={(polygonString) => {
              form.setValue("polygon", polygonString);
            }}
            isLoaded={isLoaded}
          />
        </FormItem>
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
                  <SelectItem value="MIXED">MIXED</SelectItem>
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
        {fields.map((field, index) => (
          <div key={field.id} className="mt-6 flex flex-col gap-6">
            <FormField
              control={form.control}
              name={`images.${index}.url`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">
                    Parking Space Panorama
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

                  {/* <FormDescription>
                    Upload an image for tier {index + 1} reward.
                  </FormDescription> */}
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
          Update
        </Button>
      </form>
    </Form>
  );
};

export default ParkingSpaceUpdateForm;
