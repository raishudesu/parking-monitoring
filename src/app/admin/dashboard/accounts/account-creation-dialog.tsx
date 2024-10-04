import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AccountCreationForm from "./account-creation-form";
import { CirclePlus } from "lucide-react";
import { College } from "@prisma/client";

const AccountCreationDialog = ({ colleges }: { colleges: College[] }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex gap-2 self-stretch md:ml-auto">
          Create Account
          <CirclePlus size={18} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-screen overflow-auto">
        <DialogHeader>
          <DialogTitle>Create Gate Pass Owner Account</DialogTitle>
        </DialogHeader>
        <AccountCreationForm colleges={colleges} />
      </DialogContent>
    </Dialog>
  );
};

export default AccountCreationDialog;
