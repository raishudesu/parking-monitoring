"use client";

import { Button } from "@/components/ui/button";
import { useServerAction } from "zsa-react";
import { endSessionAction } from "./actions";
import { toast } from "@/components/ui/use-toast";
import { SquareParkingOff } from "lucide-react";

const EndSessionBtn = ({ gpoAccountId }: { gpoAccountId: string }) => {
  const { isPending, execute } = useServerAction(endSessionAction);

  const onEndSession = async () => {
    try {
      const [data, err] = await execute(gpoAccountId);

      if (err) {
        const parsedErrorData = await JSON.parse(err?.data);
        console.log(err);

        toast({
          title: "Something went wrong.",
          variant: "destructive",
        });

        console.error(parsedErrorData);
      }

      if (data) {
        toast({
          title: "Parking session ended successfully.",
          description: "Thank you for using ParkSU!",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button
      onClick={onEndSession}
      disabled={isPending}
      className="p-0 self-stretch lg:self-start h-full w-full"
      variant={"ghost"}
    >
      <div className="py-6 w-full h-full bg-background border border-primary hover:bg-slate-100 ease-in-out transition-colors rounded-xl flex flex-col gap-6 justify-center items-center">
        <SquareParkingOff size={100} className="text-primary" />
        <span className="text-xl font-bold">End Session</span>
      </div>
    </Button>
  );
};

export default EndSessionBtn;
