import React, { useState, useEffect } from "react";

import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import MainDashboard from "@/components/dashbaord/MainDashboard";
import useCurrentUser from "@/hooks/useCurrentUser";
import useStore from "@/hooks/useStore";
import StoreData from "@/types/StoreData";
import UserData from "@/types/UserData";
import { toast } from "react-hot-toast";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    console.log("No hay sesion");
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  } else {
    console.log(session.user);
  }

  return {
    props: {
      session,
    },
  };
}

const Dashboard = () => {
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

  return (
    <div>
      {userData && storeData && (
        <MainDashboard userData={userData} storeData={storeData} />
      )}
      {!storeData && (
        <div className="flex flex-row justify-center mt-20 font-bold text-4xl p-10 text-center">
          No puedes ver el dashboard porque no perteneces a ninguna tienda, Si
          eres Admin ve a la seccion de perfil y unete o crea una, si eres
          empleado espera a que tu jefe te agregue a una tienda
        </div>
      )}
    </div>
  );
};

export default Dashboard;
