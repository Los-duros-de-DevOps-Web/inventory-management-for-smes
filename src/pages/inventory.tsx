import React, { useEffect, useState } from "react";

import UserData from "@/types/UserData";
import useCurrentUser from "@/hooks/useCurrentUser";
import toast from "react-hot-toast";
import { Typography } from "@mui/material";
import MainInventory from "@/components/inventory/MainInventory";

const InventoryPage = () => {
  const [userData, setUserData] = useState<UserData | null>(null);

  const fetchUserData = async () => {
    try {
      const response = await useCurrentUser();
      const userData: UserData = response.data;
      setUserData(userData);
    } catch (error) {
      toast.error("Error al cargar el usuario");
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
      {userData && <MainInventory userData={userData} />}
    </div>
  );
};

export default InventoryPage;
