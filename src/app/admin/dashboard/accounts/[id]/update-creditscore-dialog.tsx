import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReceiptCent } from "lucide-react";
import { useState } from "react";
import UpdateCreditScoreForm from "./update-creditscore-form";

const UpdateCreditScoreDialog = ({
  userId,
  creditScore,
}: {
  userId: string;
  creditScore: number;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"secondary"}
          className="flex gap-2 md:ml-auto self-stretch md:self-auto"
        >
          Update Credit Score
          <ReceiptCent />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] overflow-auto">
        <DialogHeader>
          <DialogTitle>Update Credit Score</DialogTitle>
        </DialogHeader>
        <UpdateCreditScoreForm
          setOpen={setOpen}
          userId={userId}
          creditScore={creditScore}
        />
      </DialogContent>
    </Dialog>
  );
};

export default UpdateCreditScoreDialog;
