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

const CollegeCreationDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex gap-2">
          Add College
          <CirclePlus size={18} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add College with Parking Space</DialogTitle>
        </DialogHeader>
        <CollegeCreationForm />
      </DialogContent>
    </Dialog>
  );
};

export default CollegeCreationDialog;
