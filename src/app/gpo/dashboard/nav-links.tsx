"use client";

import Link from "next/link";
import { feedbackAndReports, gpoNavLinks } from "./data";
import { usePathname } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BookOpenText, Settings } from "lucide-react";

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
      {gpoNavLinks.map(({ name, icon, link }) => (
        <li key={name}>
          <Link
            onClick={handleClick}
            href={link}
            className={`p-3 py-4 flex gap-3 items-center rounded-xl hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors ease-in-out ${
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
      <li>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <div className="flex gap-3 text-gray-700 dark:text-primary-foreground">
                <BookOpenText />
                Feedback & Reports
              </div>
            </AccordionTrigger>
            <AccordionContent>
              {feedbackAndReports.map(({ name, icon, link }) => (
                <Link
                  key={name}
                  onClick={handleClick}
                  href={link}
                  className={`w-full p-3 py-2 flex gap-3 items-center rounded-xl hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors ease-in-out ${
                    path === link
                      ? "bg-slate-100 dark:bg-zinc-800  text-primary font-semibold"
                      : "text-gray-700 dark:text-primary-foreground"
                  }`}
                >
                  {icon}
                  {name}
                </Link>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </li>
      <small className="font-bold">System</small>
      <li>
        <Link
          onClick={handleClick}
          href={"/gpo/dashboard/settings"}
          className={`p-3 py-2 flex gap-3 items-center rounded-xl hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors ease-in-out ${
            path === "/gpo/dashboard/settings"
              ? "bg-slate-100 dark:bg-zinc-800  text-primary font-semibold"
              : "text-gray-700 dark:text-primary-foreground"
          }`}
        >
          <Settings /> Settings
        </Link>
      </li>
    </>
  );
};

export default NavLinks;
