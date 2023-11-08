import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import ModalEditEmployee from "./ModalEditEmployee";
import StoreData from "@/types/StoreData";

interface TableStoresProps {
  stores: StoreData[];
  onUpdateProfile: () => void;
}

const TableStores = ({ stores, onUpdateProfile }: TableStoresProps) => {
  const [stStores, setStores] = useState<StoreData[]>([]);
  const [selectStore, setSelectStore] = useState<number>(0);

  const [openModalEmployee, setOpenModalEmployee] = useState(false);

  const handleViewModalEmployee = (id: number) => {
    setOpenModalEmployee(true);
    setSelectStore(id);
  };

  useEffect(() => {
    setStores(stores);
  }, [stores]);

  if (!stores) return <p>No hay tiendas</p>;

  return (
    <div className="mx-auto mt-3 mb-10">
      <p className="text-2xl sm:text-4xl font-bold text-center mb-5">Tiendas</p>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 bg-white">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Tienda
            </th>
            <th scope="col" className="px-6 py-3">
              Inventario
            </th>
            <th scope="col" className="px-6 py-3">
              Empleados
            </th>
            <th scope="col" className="px-6 py-3">
              Editar Empleados
            </th>
          </tr>
        </thead>
        <tbody>
          {stores &&
            stStores.map((store: any, index: number) => {
              return (
                <tr
                  className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                  key={index}
                >
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {store.name}
                  </td>
                  <td className="px-6 py-4">{store.inventory.length}</td>
                  <td className="px-6 py-4">{store.employees.length}</td>
                  <td className="px-6 py-4">
                    <Button
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      onClick={() => handleViewModalEmployee(store.id)}
                    >
                      Editar
                    </Button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      {openModalEmployee && (
        <ModalEditEmployee
          openModal={openModalEmployee}
          setOpenModal={setOpenModalEmployee}
          storeId={selectStore}
          onUpdateProfile={onUpdateProfile}
        />
      )}
    </div>
  );
};

export default TableStores;
