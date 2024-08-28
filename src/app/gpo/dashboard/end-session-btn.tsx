"use client";

import { Button } from "@/components/ui/button";
import { useServerAction } from "zsa-react";
import { endSessionAction } from "./actions";
import { toast } from "@/components/ui/use-toast";

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
      className="self-stretch lg:self-start"
    >
      End Session
    </Button>
  );
};

export default EndSessionBtn;
