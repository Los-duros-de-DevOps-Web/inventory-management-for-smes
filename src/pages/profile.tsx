"use client";

import React from "react";
import { ClipLoader } from "react-spinners";
import ImgProfile from "../../public/ImgProfile.png";
import useCurrentUser from "@/hooks/useCurrentUser";
import { Button } from "@mui/material";

const ProfilePage = () => {
  const UserData = useCurrentUser().data;

  if (!UserData) {
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader color="lightblue" size={80} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="mx-auto mt-3">
        <div className="p-4 sm:p-8 md:p-12 border rounded-lg shadow-lg bg-white flex flex-col-reverse md:flex-row gap-4 sm:gap-20">
          <div className="text-center flex flex-col justify-center">
            <p className="text-3xl sm:text-4xl font-bold">
              Bienvenido a tu perfil, {UserData.name}
            </p>
            <p className="text-sm text-gray-600">ID: {UserData.id}</p>
            <p className="text-2xl sm:text-2xl font-semibold mt-5">
              Nombre de Usuario: {UserData.username}
            </p>
            <p className="text-sm text-gray-600">Rol: {UserData.role}</p>
            <div className="mt-5">
              {UserData.role === "Admin" && <Button>Agregar Tienda</Button>}
            </div>
          </div>
          <div className="flex justify-center mt-4 sm:mt-0">
            <div className="w-32 sm:w-48 h-32 sm:h-48 bg-gray-200 rounded-full flex items-center justify-center">
              <img
                src={ImgProfile.src}
                className="object-cover rounded-full"
                alt="Profile"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-3">
        <p className="text-2xl sm:text-4xl font-bold text-center mb-5">
          Tiendas Asociadas
        </p>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 bg-white">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Tienda
              </th>
              <th scope="col" className="px-6 py-3">
                Inventario
              </th>
              <th scope="col" className="px-6 py-3">
                Empleados
              </th>
              <th scope="col" className="px-6 py-3">
                Editar Empleados
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Apple MacBook Pro 17"
              </th>
              <td className="px-6 py-4">Silver</td>
              <td className="px-6 py-4">Laptop</td>
              <td className="px-6 py-4">
                <a
                  href="#"
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Edit
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProfilePage;
