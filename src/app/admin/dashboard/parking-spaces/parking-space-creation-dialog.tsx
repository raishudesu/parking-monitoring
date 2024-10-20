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
        <Button className="flex gap-2 md:ml-auto self-stretch">
          Add a Parking Space
          <CirclePlus size={18} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-screen overflow-auto">
        <DialogHeader>
          <DialogTitle>Add parking space</DialogTitle>
        </DialogHeader>
        <ParkingSpaceCreationForm />
      </DialogContent>
    </Dialog>
  );
};

export default ParkingSpaceCreationDialog;
