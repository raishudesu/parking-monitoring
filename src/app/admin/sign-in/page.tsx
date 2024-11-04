import Logo from "@/components/logo";
import AdminSignInForm from "./admin-signin-form";
import Link from "next/link";

const AdminSignInPage = async () => {
  return (
    <div className="w-full h-screen py-6 flex justify-center">
      <div className="w-full max-w-screen-xl 2xl:max-w-screen-2xl max-h-[94rem] p-6  shadow-lg rounded-xl grid md:grid-cols-2 items-center">
        <div className="hidden md:block w-full h-full ">
          <div className="shadow-md bg-[url('https://images.unsplash.com/photo-1717043855900-76b769ffd44b?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover z-10 relative w-full h-full rounded-xl overflow-clip">
            <div className="-z-10 backdrop-filter backdrop-blur-sm absolute w-full h-full"></div>
          </div>
        </div>

        <div className="mb-16 md:mb-0 flex flex-col items-center gap-12 p-3 w-full">
          <div className="flex flex-col justify-center items-center gap-2"></div>
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
      </div>
    </div>
  );
};

export default AdminSignInPage;
