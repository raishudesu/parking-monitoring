import Logo from "@/components/logo";
import AdminSignInForm from "./admin-signin-form";
import Link from "next/link";
import localFont from "next/font/local";
import Image from "next/image";

const varsity = localFont({ src: "../../fonts/varsity_regular.ttf" });

const AdminSignInPage = async () => {
  return (
    <div className="w-full h-screen py-6 flex justify-center">
      <div className="dark:bg-zinc-900 border w-full max-w-screen-xl 2xl:max-w-screen-2xl max-h-[94rem] p-6  shadow-lg rounded-xl grid md:grid-cols-2 items-center">
        <div className="hidden text-center items-center md:flex w-full h-full ">
          <div className="shadow-md flex flex-col items-center justify-center bg-[url('/form-bg.png')] bg-center bg-cover z-10 relative w-full h-full rounded-xl overflow-clip">
            <div className="-z-10 backdrop-filter backdrop-blur-sm absolute w-full h-full"></div>
            <div className="py-6 w-full justify-center items-center flex flex-col">
              <div className="flex flex-col items-center gap-2 p-3 py-6">
                <Image
                  src={"/logo-white.png"}
                  alt="parksu-logo"
                  width={100}
                  height={100}
                />
                <h1 className="text-primary-foreground text-6xl font-bold">
                  ParkSU
                </h1>
              </div>
              <small className="text-primary-foreground tracking-wider font-semibold">
                Palawan State University Parking Monitoring System
              </small>
            </div>
          </div>
        </div>

        <div className="mb-16 md:mb-0 flex flex-col items-center gap-12 p-3 w-full">
          <div className="flex flex-col justify-center items-center gap-2"></div>
          <div className="mb-24 w-full max-w-sm">
            <div className="w-full flex flex-col items-center gap-6">
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
      </div>
    </div>
  );
};

export default AdminSignInPage;
