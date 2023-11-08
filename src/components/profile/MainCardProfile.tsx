import React, { useState } from "react";

import ImgProfile from "../../../public/ImgProfile.png";
import { Button } from "@mui/material";

import ModalAddStore from "./ModalAddStore";
import UserData from "@/types/UserData";

interface MainCardProfileProps {
  userData: UserData;
  onUpdateProfile: () => void;
}

const MainCardProfile = ({
  userData,
  onUpdateProfile,
}: MainCardProfileProps) => {
  const [openModalStore, setOpenModalStore] = useState(false);

  const handleViewModalStore = () => {
    setOpenModalStore(true);
  };

  return (
    <div className="mx-auto mt-3">
      <div className="p-4 sm:p-8 md:p-12 border rounded-lg shadow-lg bg-white flex flex-col-reverse md:flex-row gap-4 sm:gap-20">
        <div className="text-center flex flex-col justify-center">
          <p className="text-3xl sm:text-4xl font-bold">
            Bienvenido a tu perfil, {userData.name}
          </p>
          <p className="text-sm text-gray-600">ID: {userData.id}</p>
          <p className="text-2xl sm:text-2xl font-semibold mt-5">
            Nombre de Usuario: {userData.username}
          </p>
          <p className="text-sm text-gray-600">Rol: {userData.role}</p>
          <div className="mt-5">
            {userData.role === "Admin" && (
              <Button onClick={handleViewModalStore}>Agregar Tienda</Button>
            )}
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
      {openModalStore && (
        <ModalAddStore
          onUpdateProfile={onUpdateProfile}
          openModal={openModalStore}
          setOpenModal={setOpenModalStore}
        />
      )}
    </div>
  );
};

export default MainCardProfile;
