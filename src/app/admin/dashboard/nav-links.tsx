"use client";

import Link from "next/link";
import { sideNavLinks } from "./data";
import { usePathname } from "next/navigation";

const NavLinks = () => {
  const path = usePathname();
  return (
    <>
      {sideNavLinks.map(({ name, icon, link }) => (
        <li key={name}>
          <Link
            href={link}
            className={`p-3 flex gap-3 items-center rounded-xl ${
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
