import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UserRoundPen } from "lucide-react";
import AdminUpdateForm from "./admin-update-form";
import { z } from "zod";
import { adminUpdateSchema } from "@/lib/zod";
import { useState } from "react";

const AdminUpdateDialog = ({
  adminId,
  adminData,
}: {
  adminId: string;
  adminData: z.infer<typeof adminUpdateSchema>;
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
      <DialogContent className="sm:max-w-[425px] max-h-screen overflow-auto">
        <DialogHeader>
          <DialogTitle>Update Administrator Details</DialogTitle>
        </DialogHeader>
        <AdminUpdateForm
          adminId={adminId}
          adminData={adminData}
          setOpen={setOpen}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AdminUpdateDialog;
