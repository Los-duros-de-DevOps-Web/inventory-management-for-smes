import React, { useState } from "react";
import classNames from "classnames";

import Link from "next/link";

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
        "bg-indigo-700 text-zinc-50": true, // colors
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
                    "text-indigo-100 hover:bg-indigo-900": true, //colors
                    "flex gap-4 items-center ": true, //layout
                    "transition-colors duration-300": true, //animation
                    "rounded-md p-2 mx-5": true, //self style
                  })}
                >
                  {item.icon} {isHovered || !open ? item.label : null}
                </li>
              </Link>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};
export default SideBar;
