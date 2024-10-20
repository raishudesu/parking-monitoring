import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UserRoundPen } from "lucide-react";
import ParkingSpaceUpdateForm from "./parking-space-update-form";
import { z } from "zod";
import { parkingSpaceFormSchema } from "@/lib/zod";
import { useState } from "react";

const UpdateParkingSpaceDialog = ({
  parkingSpaceId,
  data,
}: {
  parkingSpaceId: string;
  data: z.infer<typeof parkingSpaceFormSchema>;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex gap-2">
          Edit
          <UserRoundPen size={15} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-screen overflow-auto">
        <DialogHeader>
          <DialogTitle>Update parking space</DialogTitle>
        </DialogHeader>
        <ParkingSpaceUpdateForm
          parkingSpaceId={parkingSpaceId}
          data={data}
          setOpen={setOpen}
        />
      </DialogContent>
    </Dialog>
  );
};

export default UpdateParkingSpaceDialog;
