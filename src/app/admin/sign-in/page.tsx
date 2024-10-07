import Logo from "@/components/logo";
import AdminSignInForm from "./admin-signin-form";
import Link from "next/link";

const AdminSignInPage = async () => {
  return (
    <div className="h-screen flex justify-center items-center ">
      <div className="mb-24 w-full max-w-sm">
        <div className="px-4 w-full flex flex-col items-center gap-6">
          <div className="text-center flex flex-col items-center gap-2">
            <Logo />
            <small className="text-muted-foreground font-semibold">
              Palawan State University Parking Monitoring System
            </small>
          </div>

          <h1 className="text-center scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl">
            Administrator Login
          </h1>
          <AdminSignInForm />
        </div>
        <div className="mt-12 w-full text-center">
          <small className="text-muted-foreground">
            Not an admin? Log in as{" "}
            <Link
              href={"/gpo/sign-in"}
              className="text-primary hover:underline font-semibold"
            >
              Gate Pass Owner
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
};

export default AdminSignInPage;
