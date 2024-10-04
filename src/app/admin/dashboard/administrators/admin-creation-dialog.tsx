import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CirclePlus } from "lucide-react";
import AdminCreationForm from "./admin-creation-form";

const AdminCreationDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex gap-2">
          Create an Administrator
          <CirclePlus size={18} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-screen overflow-auto">
        <DialogHeader>
          <DialogTitle>Create Administrator Account</DialogTitle>
        </DialogHeader>
        <AdminCreationForm />
      </DialogContent>
    </Dialog>
  );
};

export default AdminCreationDialog;
