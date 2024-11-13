"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useServerAction } from "zsa-react";
import { deleteCollegeAction } from "./actions";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";
import { useSession } from "next-auth/react";

const VisitorCardDeletionDialog = ({ cardId }: { cardId: string }) => {
  const session = useSession();
  const { isPending, execute } = useServerAction(deleteCollegeAction);
  const [open, setOpen] = useState(false);

  const onDelete = async () => {
    try {
      const [data, err] = await execute({
        cardId,
        auditAdminId: session.data?.user.id as string,
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
          description: err.message || "Try again later.",
        });
      }

      if (data) {
        toast({
          title: "Success!",
          description: "College deleted successfully.",
        });

        setOpen(!open);
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
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant={"destructive"} className="flex gap-2">
          Delete <Trash2 size={18} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive"
            onClick={onDelete}
            disabled={isPending}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default VisitorCardDeletionDialog;
