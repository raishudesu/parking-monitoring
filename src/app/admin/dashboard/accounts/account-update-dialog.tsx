import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UserRoundPen } from "lucide-react";
import AccountUpdateForm from "./account-update-form";
import { z } from "zod";
import { gpoUpdateAccountSchema } from "@/lib/zod";

const AccountUpdateDialog = ({
  accountId,
  data,
}: z.infer<typeof gpoUpdateAccountSchema>) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex gap-2">
          Edit
          <UserRoundPen size={15} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Gate Pass Owner Account</DialogTitle>
          <DialogDescription>
            Gate Pass Owners will have to log in again using the updated details
            sent to their email.
          </DialogDescription>
        </DialogHeader>
        <AccountUpdateForm accountId={accountId} data={data} />
      </DialogContent>
    </Dialog>
  );
};

export default AccountUpdateDialog;
