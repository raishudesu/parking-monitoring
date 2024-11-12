"use client";

import Link from "next/link";
import { sideNavLinks } from "./data";
import { usePathname } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { useSession } from "next-auth/react";

const NavLinks = ({
  open,
  setOpen,
}: {
  open?: boolean;
  setOpen?: Dispatch<SetStateAction<boolean>>;
}) => {
  const path = usePathname();
  const { data: session } = useSession();
  const userRole = session?.user?.role;

  const handleClick = () => {
    if (open && setOpen) {
      setOpen(!open);
    }
  };

  // Filter links based on user role
  const filteredLinks = sideNavLinks.filter(({ name }) => {
    if (userRole === "SECURITY") {
      // Only show "Visitors" and "Settings" for SECURITY role
      return ["Visitors", "Settings"].includes(name);
    }
    // Show all links for other roles
    return true;
  });

  return (
    <>
      {filteredLinks.map(({ name, icon, link }) => (
        <li key={name}>
          <Link
            onClick={handleClick}
            href={link}
            className={`p-3 py-2 flex gap-3 items-center rounded-xl hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors ease-in-out ${
              path === link
                ? "bg-slate-100 dark:bg-zinc-800  text-primary font-semibold"
                : "text-gray-700 dark:text-primary-foreground"
            }`}
          >
            {icon}
            {name}
          </Link>
        </li>
      ))}
    </>
  );
};

export default NavLinks;
