import Logo from "@/components/logo";
import AdminSignInForm from "./admin-signin-form";
import Link from "next/link";
import localFont from "next/font/local";

const varsity = localFont({ src: "../../fonts/varsity_regular.ttf" });

const AdminSignInPage = async () => {
  return (
    <div className="w-full h-screen py-6 flex justify-center">
      <div className="dark:bg-zinc-900 border w-full max-w-screen-xl 2xl:max-w-screen-2xl max-h-[94rem] p-6  shadow-lg rounded-xl grid md:grid-cols-2 items-center">
        <div className="hidden text-center items-center md:flex w-full h-full ">
          <div className="shadow-md flex flex-col items-center justify-center bg-[url('/form-bg.png')] bg-center bg-cover z-10 relative w-full h-full rounded-xl overflow-clip">
            <div className="-z-10 backdrop-filter backdrop-blur-sm absolute w-full h-full"></div>
            <div className="py-6 w-full justify-center items-center flex flex-col">
              <div className="flex items-center gap-2 p-3 py-6">
                <svg
                  fill="#FE7D55"
                  viewBox="0 0 512 512"
                  id="icons"
                  xmlns="http://www.w3.org/2000/svg"
                  transform="rotate(270)"
                  className="h-20 w-20"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path d="M208,512a24.84,24.84,0,0,1-23.34-16l-39.84-103.6a16.06,16.06,0,0,0-9.19-9.19L32,343.34a25,25,0,0,1,0-46.68l103.6-39.84a16.06,16.06,0,0,0,9.19-9.19L184.66,144a25,25,0,0,1,46.68,0l39.84,103.6a16.06,16.06,0,0,0,9.19,9.19l103,39.63A25.49,25.49,0,0,1,400,320.52a24.82,24.82,0,0,1-16,22.82l-103.6,39.84a16.06,16.06,0,0,0-9.19,9.19L231.34,496A24.84,24.84,0,0,1,208,512Zm66.85-254.84h0Z"></path>
                    <path d="M88,176a14.67,14.67,0,0,1-13.69-9.4L57.45,122.76a7.28,7.28,0,0,0-4.21-4.21L9.4,101.69a14.67,14.67,0,0,1,0-27.38L53.24,57.45a7.31,7.31,0,0,0,4.21-4.21L74.16,9.79A15,15,0,0,1,86.23.11,14.67,14.67,0,0,1,101.69,9.4l16.86,43.84a7.31,7.31,0,0,0,4.21,4.21L166.6,74.31a14.67,14.67,0,0,1,0,27.38l-43.84,16.86a7.28,7.28,0,0,0-4.21,4.21L101.69,166.6A14.67,14.67,0,0,1,88,176Z"></path>
                    <path d="M400,256a16,16,0,0,1-14.93-10.26l-22.84-59.37a8,8,0,0,0-4.6-4.6l-59.37-22.84a16,16,0,0,1,0-29.86l59.37-22.84a8,8,0,0,0,4.6-4.6L384.9,42.68a16.45,16.45,0,0,1,13.17-10.57,16,16,0,0,1,16.86,10.15l22.84,59.37a8,8,0,0,0,4.6,4.6l59.37,22.84a16,16,0,0,1,0,29.86l-59.37,22.84a8,8,0,0,0-4.6,4.6l-22.84,59.37A16,16,0,0,1,400,256Z"></path>
                  </g>
                </svg>
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
