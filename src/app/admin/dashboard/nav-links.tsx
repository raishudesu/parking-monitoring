"use client";

import Link from "next/link";
import { sideNavLinks } from "./data";
import { usePathname } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

const NavLinks = ({
  open,
  setOpen,
}: {
  open?: boolean;
  setOpen?: Dispatch<SetStateAction<boolean>>;
}) => {
  const path = usePathname();

  const handleClick = () => {
    if (open && setOpen) {
      setOpen(!open);
    }
  };

  return (
    <>
      {sideNavLinks.map(({ name, icon, link }) => (
        <li key={name}>
          <Link
            onClick={handleClick}
            href={link}
            className={`p-3 py-4 flex gap-3 items-center rounded-xl hover:bg-slate-50 transition-colors ease-in-out ${
              path === link
                ? "bg-slate-100 text-primary font-semibold"
                : "text-gray-700"
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
