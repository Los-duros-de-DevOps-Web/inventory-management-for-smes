"use client";

import React from "react";
import { ClipLoader } from "react-spinners";
import useCurrentUser from "@/hooks/useCurrentUser";
import MainCardProfile from "@/components/profile/MainCardProfile";
import StoreCardProfile from "@/components/profile/StoreCardProfile";
import TableStores from "@/components/profile/TableStores";

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
      {UserData.storeId !== null && (
        <StoreCardProfile storeId={UserData.storeId} />
      )}
      {UserData.role === "Admin" && <TableStores />}
    </div>
  );
};

export default ProfilePage;
