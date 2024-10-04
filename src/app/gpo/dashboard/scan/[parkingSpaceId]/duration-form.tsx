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
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useServerAction } from "zsa-react";
import { createGpoSessionAction } from "./actions";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ParkingSpace } from "@prisma/client";

const durationFormSchema = z.object({
  duration: z.string(),
});

const DurationForm = ({
  parkingSpaceId,
  parkingSpace,
}: {
  parkingSpaceId: string;
  parkingSpace: ParkingSpace | null;
}) => {
  const session = useSession();
  const router = useRouter();

  const { isPending, execute } = useServerAction(createGpoSessionAction);

  const form = useForm<z.infer<typeof durationFormSchema>>({
    resolver: zodResolver(durationFormSchema),
    defaultValues: {
      duration: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof durationFormSchema>) => {
    try {
      // Get the user's current location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;

            // Calculate distance between user and parking space
            const userLocation = { lat: latitude, lng: longitude };
            const parkingLocation = {
              lat: parseFloat(parkingSpace!.latitude),
              lng: parseFloat(parkingSpace!.longitude),
            };

            const distance = calculateDistance(userLocation, parkingLocation);

            // Define a radius of 50 meters (50 kilometers)
            const radius = 0.05;

            if (distance > radius) {
              toast({
                title: "Error",
                description: `You are too far from the parking space. Please move closer.`,
                variant: "destructive",
              });
              return;
            }

            // If within radius, proceed with session creation
            const [data, err] = await execute({
              parkingSpaceId,
              gpoAccountID: session.data?.user.id as string,
              duration: values.duration,
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
                description: err.message,
              });
              return;
            }

            if (data) {
              toast({
                title: "Parking session created",
                description: "Redirecting you now...",
              });

              router.replace("/gpo/dashboard/scan/scan-success");
            }
          },
          (error) => {
            console.error("Geolocation error:", error);
            toast({
              title: "Error",
              description:
                "Failed to get your location. Please allow location access.",
              variant: "destructive",
            });
          }
        );
      } else {
        toast({
          title: "Error",
          description: "Geolocation is not supported by your browser.",
          variant: "destructive",
        });
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

  // Helper function to calculate distance between two points using the Haversine formula
  const calculateDistance = (
    point1: { lat: number; lng: number },
    point2: { lat: number; lng: number }
  ): number => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = ((point2.lat - point1.lat) * Math.PI) / 180;
    const dLng = ((point2.lng - point1.lng) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((point1.lat * Math.PI) / 180) *
        Math.cos((point2.lat * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in kilometers
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="h-full space-y-6">
        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select Parking Duration</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={isPending}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Parking Duration" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="1HOUR">1 Hour</SelectItem>
                  <SelectItem value="2HOURS">2 Hours</SelectItem>
                  <SelectItem value="3HOURS">3 Hours</SelectItem>
                  <SelectItem value="4HOURS">4 Hours</SelectItem>
                  <SelectItem value="5HOURS">5 Hours</SelectItem>
                  <SelectItem value="6HOURS">6 Hours</SelectItem>
                  <SelectItem value="7HOURS">7 Hours</SelectItem>
                  <SelectItem value="8HOURS">8 Hours</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending}>
          Start Session
        </Button>
      </form>
    </Form>
  );
};

export default DurationForm;
