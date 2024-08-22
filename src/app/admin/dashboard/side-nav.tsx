import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown } from "lucide-react";
import NavLinks from "./nav-links";

const SideNav = () => {
  return (
    <aside className="p-3 py-6 hidden lg:flex flex-col gap-3 border-r w-80">
      <div className="flex items-center gap-2 p-3 py-6 rounded-xl shadow-sm">
        <svg
          fill="#FE7D55"
          viewBox="0 0 512 512"
          id="icons"
          xmlns="http://www.w3.org/2000/svg"
          transform="rotate(270)"
          className="h-8 w-8"
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
        <h1 className="text-primary text-xl">ParkSU</h1>
      </div>
      <div className="text-muted-foreground flex flex-col justify-between gap-3 h-full">
        <div className="flex flex-col gap-3">
          <span className="font-mono">Navigate</span>
          <nav>
            <ul className="flex flex-col gap-3">
              <NavLinks />
            </ul>
          </nav>
        </div>
        <div className="w-full hover:border p-3 flex justify-between items-center rounded-xl">
          <div className="flex gap-2 items-center">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-semibold">John Doe</span>
              <small className="text-muted-foreground">johndoe@gmail.com</small>
            </div>
          </div>
          <ChevronDown />
        </div>
      </div>
    </aside>
  );
};

export default SideNav;
