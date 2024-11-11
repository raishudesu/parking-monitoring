import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import NavLinks from "./nav-links";
import Logo from "@/components/logo";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import SignOutBtn from "@/components/signout-btn";

const SideNav = async () => {
  const session = await getServerSession(authOptions);

  const user = session?.user;

  return (
    <aside className="dark:bg-zinc-900 p-3 py-6 hidden lg:flex flex-col gap-3 border-r min-w-[20rem] overflow-auto">
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
              <AvatarFallback>
                <span className="capitalize">
                  {user?.firstName.slice(0, 1)}
                  {user?.lastName.slice(0, 1)}
                </span>
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-semibold">
                {user?.firstName} {user?.lastName}
              </span>
              <small
                className={`font-semibold ${
                  user?.role === "SUPERADMIN"
                    ? "text-destructive"
                    : "text-green-500"
                }`}
              >
                {user?.role}
              </small>
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
