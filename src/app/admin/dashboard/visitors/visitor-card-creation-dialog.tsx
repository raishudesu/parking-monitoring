import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CirclePlus } from "lucide-react";
import { useState } from "react";
import VisitorCardCreationForm from "./visitor-card-creation-form";

const VisitorCardCreationDialog = () => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex gap-2 md:ml-auto self-stretch md:self-auto">
          Add Visitor Card
          <CirclePlus size={18} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] overflow-auto">
        <DialogHeader>
          <DialogTitle>Create a Visitor Card QR Pass</DialogTitle>
        </DialogHeader>
        <VisitorCardCreationForm setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default VisitorCardCreationDialog;
