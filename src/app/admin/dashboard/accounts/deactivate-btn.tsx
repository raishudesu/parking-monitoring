import { Button } from "@/components/ui/button";
import { LoaderCircle, ShieldCheck, ShieldMinus } from "lucide-react";
import { useServerAction } from "zsa-react";
import { deactivateGpoAccountAction } from "./actions";
import { toast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";

const DeactivateBtn = ({ accountId }: { accountId: string }) => {
  const session = useSession();
  const { isPending, execute } = useServerAction(deactivateGpoAccountAction);

  const isAdmin = session.data?.user.role === "ADMIN";

  const handleDeactivate = async () => {
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
          description: "Account deactivated successfully.",
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
      variant="destructive"
      className="flex gap-2"
      onClick={handleDeactivate}
      disabled={isAdmin || isPending}
    >
      Deactivate
      {isPending ? (
        <LoaderCircle size={18} className="animate-spin" />
      ) : (
        <ShieldMinus size={18} />
      )}
    </Button>
  );
};

export default DeactivateBtn;
