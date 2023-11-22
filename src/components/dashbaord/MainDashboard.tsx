import useCurrentUser from "@/hooks/useCurrentUser";
import useStore from "@/hooks/useStore";
import StoreData from "@/types/StoreData";
import UserData from "@/types/UserData";
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import CardStock from "./CardStock";
import CardOrder from "./CardOrder";
import CardAalarm from "./CardAalarm";
import ImgProfile from "../../../public/ImgProfile.png";
import Graph from "./Graph";

const MainDashboard = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [storeData, setStoreData] = useState<StoreData | null>(null);

  const fetchUser = async () => {
    try {
      const response = await useCurrentUser();
      const userData: UserData = response.data;
      setUserData(userData);
      fetchStoreData(userData.storeId);
    } catch (error) {
      toast.error("Error al cargar el usuario");
    }
  };

  const fetchStoreData = async (id: number) => {
    try {
      const response = await useStore.useGetStore(id);
      const storeData: StoreData = response.data;
      setStoreData(storeData);
    } catch (error) {
      toast.error("Error al cargar la tienda");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (!userData) return <div>loading...</div>;

  return (
    <div>
      {!storeData && (
        <div className="flex flex-row justify-center mt-20 font-bold text-4xl">
          No puedes ver el dashboard porque no perteneces a ninguna tienda, Si
          eres Admin ve a la seccion de perfil y unete o crea una, si eres
          empleado espera a que tu jefe te agregue a una tienda
        </div>
      )}
      {storeData && userData && (
        <div>
          <div>
            <div className="flex flex-col mt-10 text-3xl text-center">
              Bienvenido al Dashboard, espero que la pases bien:
              <div>
                <span className="font-bold">{userData.name}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-center gap-10 mt-20">
            <CardStock />
            <CardOrder storeId={storeData.id} />
            <CardAalarm />
            <div className="w-32 sm:w-48 h-32 sm:h-48 bg-gray-200 rounded-full flex items-center justify-center">
              <img
                src={ImgProfile.src}
                className="object-cover rounded-full"
                alt="Profile"
              />
            </div>
          </div>
          <Graph />
        </div>
      )}
    </div>
  );
};

export default MainDashboard;
