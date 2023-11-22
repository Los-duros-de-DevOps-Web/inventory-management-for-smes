import React, { useState, useEffect } from "react";

import StoreData from "@/types/StoreData";
import UserData from "@/types/UserData";
import useStore from "@/hooks/useStore";
import useCurrentUser from "@/hooks/useCurrentUserData";
import { toast } from "react-hot-toast";

import { Typography } from "@mui/material";
import MainOrder from "@/components/order/MainOrder";

const OrdersPage = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [storeData, setStoreData] = useState<StoreData | null>(null);

  const fetchUserData = async () => {
    try {
      const response = await useCurrentUser();
      const userData: UserData = response.data;
      setUserData(userData);
      fetchStore(userData.storeId);
    } catch (error) {
      toast.error("Error al cargar el usuario");
    }
  };

  const fetchStore = async (storeId: number) => {
    try {
      const response = await useStore.useGetStore(storeId);
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
        No Perteneces a ninguna tienda
      </Typography>
    );
  }
  return (
    <div className="flex flex-col gap-6">
      {userData && storeData && <MainOrder storeData={storeData} />}
    </div>
  );
};

export default OrdersPage;
