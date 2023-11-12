import React, { use, useEffect, useState } from "react";

import UserData from "@/types/UserData";
import StoreData from "@/types/StoreData";
import useCurrentUser from "@/hooks/useCurrentUser";
import useStore from "@/hooks/useStore";
import toast from "react-hot-toast";
import { Typography } from "@mui/material";
import MainInventory from "@/components/inventory/MainInventory";

const InventoryPage = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [storeData, setStoreData] = useState<StoreData | null>(null);

  const fetchUserData = async () => {
    try {
      const response = await useCurrentUser();
      const userData: UserData = response.data;
      setUserData(userData);
      fetchStoreData(userData);
    } catch (error) {
      toast.error("Error al cargar el usuario");
    }
  };

  const fetchStoreData = async (userData: UserData) => {
    try {
      const response = await useStore.useGetStore(userData.storeId);
      const storeData: StoreData = response.data;
      setStoreData(storeData);
    } catch (error) {
      toast.error("Error al cargar la tienda");
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (!userData?.storeId) {
    return (
      <Typography
        className="text-center"
        sx={{ mt: 5, fontWeight: "bold", fontSize: 30 }}
      >
        No puedes ver los Inventarios, debido a que no perteneces a ninguna
        tienda
      </Typography>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {userData && storeData && <MainInventory storeData={storeData} />}
    </div>
  );
};

export default InventoryPage;
