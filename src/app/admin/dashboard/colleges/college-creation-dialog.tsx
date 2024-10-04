import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CirclePlus } from "lucide-react";
import CollegeCreationForm from "./college-creation-form";
import { useState } from "react";

const CollegeCreationDialog = () => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex gap-2 md:ml-auto self-stretch md:self-auto">
          Add College
          <CirclePlus size={18} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] overflow-auto">
        <DialogHeader>
          <DialogTitle>Add College with Parking Space</DialogTitle>
        </DialogHeader>
        <CollegeCreationForm setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default CollegeCreationDialog;
