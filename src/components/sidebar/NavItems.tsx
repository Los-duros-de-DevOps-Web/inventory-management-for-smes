// components/layout/defaultNavItems.tsx
import React from "react";
import { AiFillHome } from "react-icons/ai";
import { MdInventory2 } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import { BiSolidReport, BiSolidLogIn } from "react-icons/bi";
import { FaUsers, FaUserAlt } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";

import { NavItem } from "./SideBar";

export const NavItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "/",
    icon: <AiFillHome className="w-6 h-6" />,
  },
  {
    label: "Inventario",
    href: "/team",
    icon: <MdInventory2 className="w-6 h-6" />,
  },
  {
    label: "Pedidos",
    href: "/projects",
    icon: <TbTruckDelivery className="w-6 h-6" />,
  },
  {
    label: "Reportes",
    href: "/calendar",
    icon: <BiSolidReport className="w-6 h-6" />,
  },
  {
    label: "Clientes",
    href: "/calendar",
    icon: <FaUsers className="w-6 h-6" />,
  },
  {
    label: "Notificaciones",
    href: "/calendar",
    icon: <IoIosNotifications className="w-6 h-6" />,
  },
  {
    label: "Perfil",
    href: "/calendar",
    icon: <FaUserAlt className="w-6 h-6" />,
  },
  {
    label: "Logout",
    href: "/calendar",
    icon: <BiSolidLogIn className="w-6 h-6" />,
  },
];
