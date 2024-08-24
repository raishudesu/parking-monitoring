import Logo from "@/components/logo";
import GpoSignInForm from "./form";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

const SignInPage = async () => {
  const session = await getServerSession(authOptions);

  if (session?.user.role === "GPO") {
    redirect("/gpo/dashboard");
  }

  return (
    <div className="h-screen flex justify-center items-center ">
      <div className="mb-12 w-full max-w-screen-sm">
        <div className="w-full flex flex-col items-center gap-6">
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
      </div>
    </div>
  );
};

export default SignInPage;
