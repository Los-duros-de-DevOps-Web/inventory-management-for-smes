"use client";

import { AiFillHome } from "react-icons/ai";
import { MdInventory2 } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import { BiSolidReport, BiSolidLogIn } from "react-icons/bi";
import { FaUsers, FaUserAlt } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";

// components/layout/Navbar.tsx
import React from "react";
import classNames from "classnames";

type Props = {
  onMenuButtonClick(): void;
};
const Navbar = (props: Props) => {
  return (
    <nav
      className={classNames({
        "bg-white text-zinc-500": true, // colors
        "flex items-center": true, // layout
        "w-full fixed z-10 px-4 shadow-sm h-16": true, //positioning & styling
      })}
    >
      <div className="font-bold text-lg">My Logo</div>
      <div className="flex-grow"></div>
      <button className="md:hidden" onClick={props.onMenuButtonClick}>
        <AiFillHome className="h-6 w-6" />
        <p>Hola</p>
      </button>
    </nav>
  );
};
export default Navbar;
