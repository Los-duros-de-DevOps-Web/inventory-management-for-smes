"use client";

import React from "react";
import { ClipLoader } from "react-spinners";
import useCurrentUser from "@/hooks/useCurrentUser";
import MainCardProfile from "@/components/profile/MainCardProfile";

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
      {UserData && <MainCardProfile UserData={UserData} />}
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
