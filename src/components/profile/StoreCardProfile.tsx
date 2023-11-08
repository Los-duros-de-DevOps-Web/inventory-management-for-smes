import React, { useEffect, useState } from "react";
import StoreData from "@/types/StoreData";
import { ClipLoader } from "react-spinners";
import { toast } from "react-hot-toast";
import useStore from "@/hooks/useStore";

interface StoreCardProfileProps {
  storeId: number;
  onUpdateProfile: () => void;
}

const StoreCardProfile = ({
  storeId,
  onUpdateProfile,
}: StoreCardProfileProps) => {
  const [store, setStore] = useState<StoreData | null>(null);

  useEffect(() => {
    const getStore = async () => {
      try {
        const response = await useStore.useGetStore(storeId);
        setStore(response.data);
      } catch (error) {
        toast.error("Error al cargar la tienda");
      }
    };

    getStore();
  }, [onUpdateProfile]);

  if (!store) {
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader color="lightblue" size={80} />
      </div>
    );
  }

  return (
    <div className="mx-auto mt-3">
      <div className="p-4 sm:p-8 md:p-12 border rounded-lg shadow-lg bg-white flex flex-col-reverse md:flex-row gap-4 sm:gap-20">
        <div className="text-center flex flex-col justify-center">
          <p className="text-3xl sm:text-4xl font-bold">
            Perteneces a la tienda: {store.name}
          </p>
          <p className="text-2xl sm:text-2xl font-semibold mt-5 mb-3">
            Detalles de la tienda
          </p>
          <div>
            <p>Cantidad de Empleados: {store.employees.length}</p>
            <p>Numero de Inventarios: {store.inventory.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreCardProfile;
