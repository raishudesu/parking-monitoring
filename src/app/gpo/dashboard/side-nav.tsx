import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Logo from "@/components/logo";
import NavLinks from "./nav-links";
import SignOutBtn from "@/components/signout-btn";
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
        <div className="w-full p-3 flex flex-col gap-4 rounded-xl">
          <div className="flex gap-2 items-center">
            <Avatar>
              <AvatarFallback>GPO</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-semibold">{user?.gatePassNumber}</span>
              <small className="text-muted-foreground">{user?.corpEmail}</small>
            </div>
          </div>
          <SignOutBtn />
        </div>
      </div>
    </aside>
  );
};

export default SideNav;
