"use client";

import React, { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import useCurrentUser from "@/hooks/useCurrentUser";
import MainCardProfile from "@/components/profile/MainCardProfile";
import StoreCardProfile from "@/components/profile/StoreCardProfile";
import TableStores from "@/components/profile/TableStores";
import toast from "react-hot-toast";
import UserData from "@/types/UserData";
import StoreData from "@/types/StoreData";
import useStore from "@/hooks/useStore";

const ProfilePage = () => {
  const [userData, setUserData]: any = useState<UserData | null>(null);
  const [storeData, setStoreData]: any = useState<StoreData[] | null>(null);

  const fetchUserData = async () => {
    try {
      const response = await useCurrentUser();
      const userData: UserData = response.data;
      setUserData(userData);
    } catch (error) {
      toast.error("Error al cargar el usuario");
    }
  };

  const fetchStoreData = async () => {
    try {
      const response = await useStore.useStores();
      const storeData: StoreData[] = response.data;
      setStoreData(storeData);
    } catch (error) {
      toast.error("Error al cargar la tienda");
    }
  };

  const onUpdateProfile = () => {
    fetchUserData();
    fetchStoreData();
  };

  useEffect(() => {
    onUpdateProfile();
  }, []);

  if (!userData) {
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader color="lightblue" size={80} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {userData && (
        <MainCardProfile
          userData={userData}
          onUpdateProfile={onUpdateProfile}
        />
      )}
      {userData.storeId !== null && (
        <StoreCardProfile
          storeId={userData.storeId}
          onUpdateProfile={onUpdateProfile}
        />
      )}
      {userData.role === "Admin" && (
        <TableStores stores={storeData} onUpdateProfile={onUpdateProfile} />
      )}
    </div>
  );
};

export default ProfilePage;
