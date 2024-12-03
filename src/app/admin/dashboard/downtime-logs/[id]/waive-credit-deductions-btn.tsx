"use client";

import { Button } from "@/components/ui/button";
import { LoaderCircle, ShieldCheck } from "lucide-react";
import { useServerAction } from "zsa-react";
import { toast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";
import { restoreCreditScoresByDowntimeAction } from "../actions";

const WaiveCreditDeductionsBtn = ({
  logId,
  accountIds,
}: {
  logId: string;
  accountIds: string[];
}) => {
  const session = useSession();

  const { isPending, execute } = useServerAction(
    restoreCreditScoresByDowntimeAction
  );

  const isAdmin = session.data?.user.role === "ADMIN";

  const handleReactivate = async () => {
    try {
      const [data, err] = await execute({
        logId,
        accountIds,
      });

      if (err) {
        const parsedErrorData = await JSON.parse(err?.data);

        toast({
          title: "Something went wrong.",
          variant: "destructive",
          description: `Try again later. Error: ${parsedErrorData}`,
        });
      }

      if (data) {
        toast({
          title: "Success!✅",
          description: "All accounts affected compensated successfully.",
        });
      }
    } catch (error) {
      toast({
        title: "Something went wrong.",
        variant: "destructive",
        description: `Try again later. Error: ${error}`,
      });
      console.error(error);
    }
  };

  return (
    <Button
      className="bg-green-500 flex gap-2 hover:bg-green-600"
      onClick={handleReactivate}
      disabled={isAdmin || isPending}
    >
      Waive Violations
      {isPending ? (
        <LoaderCircle size={18} className="animate-spin" />
      ) : (
        <ShieldCheck size={18} />
      )}
    </Button>
  );
};

export default WaiveCreditDeductionsBtn;
