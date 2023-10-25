import React from "react";
import useGetStore from "@/hooks/useGetStore";

const StoreCardProfile = ({ storeId }: any) => {
  console.log(storeId);

  const store = useGetStore(storeId).data;

  if (!store) {
    return <div>Loading...</div>;
  } else {
    console.log(store);
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
