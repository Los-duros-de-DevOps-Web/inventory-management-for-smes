import React, { useState, useEffect, use } from "react";
import useCurrentUser from "@/hooks/useCurrentUserData";
import useStore from "@/hooks/useStore";
import UserData from "@/types/UserData";
import StoreData from "@/types/StoreData";
import { toast } from "react-hot-toast";
import MainReports from "@/components/reportsFile/MainReports";

const ReportsPage = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [store, setStore] = useState<StoreData | null>(null);

  const fetchUser = async () => {
    try {
      const response = await useCurrentUser();
      const userData: UserData = response.data;
      setUser(userData);
      fetchStore(userData.storeId);
    } catch (error) {
      toast.error("Error al cargar el usuario");
    }
  };

  const fetchStore = async (storeId: number) => {
    try {
      const response = await useStore.useGetStore(storeId);
      const storeData: StoreData = response.data;
      setStore(storeData);
    } catch (error) {}
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (!store) return <div>Store not found</div>;

  return <div>{user && store && <MainReports storeId={store.id} />}</div>;
};

export default ReportsPage;
