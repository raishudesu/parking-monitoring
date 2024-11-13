import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UserRoundPen } from "lucide-react";
import { z } from "zod";
import { visitorCardUpdateSchema } from "@/lib/zod";
import VisitorCardUpdateForm from "./visitor-card-update-form";
import { useState } from "react";

const VisitorCardUpdateDialog = ({
  cardId,
  cardNumber,
}: z.infer<typeof visitorCardUpdateSchema>) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex gap-2">
          Edit
          <UserRoundPen size={15} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update College</DialogTitle>
        </DialogHeader>
        <VisitorCardUpdateForm
          cardId={cardId}
          cardNumber={cardNumber}
          setOpen={setOpen}
        />
      </DialogContent>
    </Dialog>
  );
};

export default VisitorCardUpdateDialog;
