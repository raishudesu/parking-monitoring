import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import NavLinks from "./nav-links";
import Logo from "@/components/logo";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const SideNav = async () => {
  const session = await getServerSession(authOptions);

  const user = session?.user;

  return (
    <aside className="p-3 py-6 hidden lg:flex flex-col gap-3 border-r w-80">
      <Logo />
      <div className="text-muted-foreground flex flex-col justify-between gap-3 h-full">
        <div className="flex flex-col gap-3">
          <span className="font-mono">Navigate</span>
          <nav>
            <ul className="flex flex-col gap-3">
              <NavLinks />
            </ul>
          </nav>
        </div>
        <div className="w-full p-3 flex justify-between items-center rounded-xl">
          <div className="flex gap-2 items-center">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-semibold">
                {user?.firstName} {user?.lastName}
              </span>
              <small className="text-muted-foreground">{user?.corpEmail}</small>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SideNav;
