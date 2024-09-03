import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CirclePlus } from "lucide-react";
import ParkingSpaceCreationForm from "./parking-space-creation-form";

const ParkingSpaceCreationDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex gap-2">
          Add a Parking Space
          <CirclePlus size={18} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add parking space</DialogTitle>
        </DialogHeader>
        <ParkingSpaceCreationForm />
      </DialogContent>
    </Dialog>
  );
};

export default ParkingSpaceCreationDialog;
