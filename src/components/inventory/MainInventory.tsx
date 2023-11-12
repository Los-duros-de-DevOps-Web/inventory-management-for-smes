import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import StoreData from "@/types/StoreData";
import { toast } from "react-hot-toast";
import ModalAddInventory from "./ModalAddInventory";
import CardInventory from "./CardInventory";
import InventoryData from "@/types/InventoryData";
import useInventory from "@/hooks/useInventory";
import { ClipLoader } from "react-spinners";

interface MainInventoryProps {
  storeData: StoreData;
}

const MainInventory = ({ storeData }: MainInventoryProps) => {
  const [inventory, setInventory] = useState<InventoryData[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const fetchInventoryData = async () => {
    try {
      const response = await useInventory.getInventory(storeData.id);
      const inventoryData: InventoryData[] = response.data;
      setInventory(inventoryData);
    } catch (error) {
      toast.error("Error al cargar la tienda");
    }
  };

  const updateInventory = () => {
    fetchInventoryData();
  };

  useEffect(() => {
    fetchInventoryData();
  }, []);

  if (!storeData) {
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader color="lightblue" size={80} />
      </div>
    );
  }

  return (
    <>
      <div>
        <div className="w-[100%] flex text-3xl mt-4 flex-col">
          <p className="text-center">
            Bienvenido a la sección de Inventario, a continuación podras ver los
            inventarios de la tienda:
          </p>
          <p className="font-bold text-center text-5xl">{storeData.name}</p>
        </div>
        <div className="flex mt-10 flex-row justify-center">
          <Button
            variant="outlined"
            sx={{ fontSize: 15, width: "30%" }}
            onClick={() => setOpenModal(!openModal)}
          >
            Agregar Nuevo Inventario
          </Button>
        </div>
        <div>
          <div className="flex flex-col justify-center mt-3">
            {inventory.map((inventory: InventoryData, index: number) => {
              return (
                <CardInventory
                  key={index}
                  inventory={inventory}
                  store={storeData}
                  updateInventory={updateInventory}
                />
              );
            })}
          </div>
        </div>
      </div>
      <ModalAddInventory
        openModal={openModal}
        setOpenModal={setOpenModal}
        storeId={storeData.id}
        updateInventory={updateInventory}
      />
    </>
  );
};

export default MainInventory;
