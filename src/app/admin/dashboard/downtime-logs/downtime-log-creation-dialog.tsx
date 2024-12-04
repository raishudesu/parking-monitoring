import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CirclePlus } from "lucide-react";
import DowntimeLogForm from "./create-downtime-log-form";

const DowntimeLogCreationDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex gap-2 self-stretch md:ml-auto">
          Add Log
          <CirclePlus size={18} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-screen overflow-auto">
        <DialogHeader>
          <DialogTitle>Create a System Downtime Log</DialogTitle>
        </DialogHeader>
        <DowntimeLogForm />
      </DialogContent>
    </Dialog>
  );
};

export default DowntimeLogCreationDialog;
