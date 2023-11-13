// components/layout/defaultNavItems.tsx
import React from "react";
import { AiFillHome, AiOutlineCodeSandbox } from "react-icons/ai";
import { MdInventory2 } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import { BiSolidReport } from "react-icons/bi";
import { FaUserAlt } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";

import { NavItem } from "./SideBar";

export const NavItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "/",
    icon: <AiFillHome className="w-6 h-6" />,
  },
  {
    label: "Productos",
    href: "/products",
    icon: <AiOutlineCodeSandbox className="w-6 h-6" />,
  },
  {
    label: "Inventario",
    href: "/inventory",
    icon: <MdInventory2 className="w-6 h-6" />,
  },
  {
    label: "Pedidos",
    href: "/orders",
    icon: <TbTruckDelivery className="w-6 h-6" />,
  },
  {
    label: "Reportes",
    href: "/reports",
    icon: <BiSolidReport className="w-6 h-6" />,
  },
  {
    label: "Notificaciones",
    href: "/notify",
    icon: <IoIosNotifications className="w-6 h-6" />,
  },
  {
    label: "Perfil",
    href: "/profile",
    icon: <FaUserAlt className="w-6 h-6" />,
  },
];
