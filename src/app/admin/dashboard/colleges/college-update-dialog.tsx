import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UserRoundPen } from "lucide-react";
import CollegeUpdateForm from "./college-update-form";
import { z } from "zod";
import { collegeSchema } from "@/lib/zod";

const CollegeUpdateDialog = ({
  id: collegeId,
  collegeName,
}: z.infer<typeof collegeSchema>) => {
  return (
    <Dialog>
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
        <CollegeUpdateForm id={collegeId} collegeName={collegeName} />
      </DialogContent>
    </Dialog>
  );
};

export default CollegeUpdateDialog;
