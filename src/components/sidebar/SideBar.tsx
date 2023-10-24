import React, { useState } from "react";
import classNames from "classnames";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";

import Link from "next/link";
import { BiSolidLogIn } from "react-icons/bi";

import { NavItems } from "./NavItems";

export type NavItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

type Props = {
  open: boolean;
  setOpen(open: boolean): void;
  navItems?: NavItem[];
};

const SideBar = ({ open, setOpen, navItems = NavItems }: Props) => {
  const router = useRouter();

  const Logout = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className={classNames({
        "flex flex-col justify-between": true, // layout
        "bg-gray-600  text-white": true, // colors
        "md:w-[250px] md:sticky md:top-16 md:z-0 top-0 z-20 fixed": isHovered, // positioning
        "md:w-[80px] md:sticky md:top-16 md:z-0 top-0 z-20 fixed": !isHovered,
        "md:h-[calc(100vh_-_64px)] h-full w-[300px]": true, // for height and width
        "transition-transform .3s ease-in-out md:-translate-x-0": true,
        "-translate-x-full ": !open,
      })}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <nav className="md:sticky top-0 md:top-16">
        <ul className="py-2 flex flex-col gap-2">
          {navItems.map((item, index) => {
            return (
              <Link key={index} href={item.href}>
                <li
                  className={classNames({
                    "text-white hover:bg-gray-800": true, //colors
                    "flex gap-4 items-center ": true, //layout
                    "transition-colors duration-300": true, //animation
                    "rounded-md p-2 mx-5": true, //self style
                  })}
                >
                  {item.icon}{" "}
                  {isHovered || (open && !isHovered) ? item.label : null}
                </li>
              </Link>
            );
          })}
          <li
            className={classNames({
              "text-white hover:bg-gray-800": true, //colors
              "flex gap-4 items-center ": true, //layout
              "transition-colors duration-300": true, //animation
              "rounded-md p-2 mx-5": true, //self style
            })}
            onClick={Logout}
          >
            {<BiSolidLogIn className="w-6 h-6"></BiSolidLogIn>}
            {isHovered || (open && !isHovered) ? "Logout" : null}
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default SideBar;
