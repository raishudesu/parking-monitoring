import { ModeToggle } from "@/components/mode-toggle";
import ChangePasswordForm from "./change-password-form";

const SettingsPage = () => {
  return (
    <div className="w-full flex flex-col py-6 px-3 md:px-6">
      <div className="pb-6 flex flex-col gap-3">
        <div className="text-lg text-muted-foreground">Dashboard</div>
        <h1 className="text-primary scroll-m-20 text-4xl tracking-tight lg:text-5xl">
          Settings
        </h1>
      </div>

      <div className="mt-6">
        <div className="max-w-screen-sm">
          <h2 className="scroll-m-20 pb-2 text-xl tracking-tight first:mt-0">
            Change Password
          </h2>
          <ChangePasswordForm />
        </div>
        <div className="max-w-screen-sm my-12 flex justify-between items-center">
          <div>
            <h2 className="scroll-m-20 pb-2 text-xl tracking-tight first:mt-0">
              Theme
            </h2>
            <small className="text-sm text-muted-foreground">
              Select your system theme
            </small>
          </div>
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
