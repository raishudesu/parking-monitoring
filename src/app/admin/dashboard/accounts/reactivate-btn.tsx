import { Button } from "@/components/ui/button";
import { LoaderCircle, ShieldCheck } from "lucide-react";
import { useServerAction } from "zsa-react";
import { reactivateGpoAccountAction } from "./actions";
import { toast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";

const ReactivateBtn = ({ accountId }: { accountId: string }) => {
  const session = useSession();

  const { isPending, execute } = useServerAction(reactivateGpoAccountAction);

  const handleReactivate = async () => {
    try {
      const [data, err] = await execute({
        auditAdminId: session.data?.user.id as string,
        accountId,
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
          description: "Account reactivated successfully.",
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
      disabled={isPending}
    >
      Reactivate
      {isPending ? (
        <LoaderCircle size={18} className="animate-spin" />
      ) : (
        <ShieldCheck size={18} />
      )}
    </Button>
  );
};

export default ReactivateBtn;
