import { Ban } from "lucide-react";
import SignOutBtn from "../../../components/signout-btn";

const DeactivatedPage = async () => {
  return (
    <div className="w-full h-screen flex flex-col gap-6 justify-center items-center">
      <div className="px-6 flex flex-col gap-6 items-center text-center">
        <Ban size={100} className="text-destructive" />
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl">
          Your account is Deactivated.
        </h1>
        <small className="text-sm font-medium leading-none">
          Contact our Administrators to activate your ParkSU account.
        </small>
        <small className="text-sm font-medium leading-none">
          Account already activated? Try to refresh the page or sign in again.
        </small>
      </div>
      <SignOutBtn />
    </div>
  );
};

export default DeactivatedPage;
