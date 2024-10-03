import Logo from "@/components/logo";
import GpoSignInForm from "./gpo-signin-form";
import Link from "next/link";

const SignInPage = async () => {
  return (
    <div className="h-screen flex justify-center items-center ">
      <div className="mb-24 w-full max-w-sm">
        <div className="px-4 w-full flex flex-col items-center gap-6">
          <div className="flex flex-col items-center gap-2">
            <Logo />
            <small className="text-muted-foreground font-semibold">
              Palawan State University Parking Monitoring System
            </small>
          </div>

          <h1 className="text-center scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl">
            Login to ParkSU
          </h1>
          <GpoSignInForm />
        </div>
        <div className="mt-12 w-full text-center">
          <small className="text-muted-foreground">
            Not a Gate Pass Owner? Log in as {""}
            <Link
              href={"/admin/sign-in"}
              className="text-primary hover:underline font-semibold"
            >
              Administrator
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
