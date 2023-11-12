import InventoryData from "@/types/InventoryData";
import StoreData from "@/types/StoreData";
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";
import DetailsInventory from "./DetailsInventory";

interface CardInventoryProps {
  inventory: InventoryData;
  store: StoreData;
  updateInventory: () => void;
}

const CardInventory = ({
  inventory,
  store,
  updateInventory,
}: CardInventoryProps) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [amountProducts, setAmountProducts] = useState<number>(0);
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [totalValue, setTotalValue] = useState<number>(0);
  const [status, setStatus] = useState<boolean>(false);

  const getAmountProducts = () => {
    const amountProducts = inventory.products.length;
    setAmountProducts(amountProducts);
  };

  const getTotalProducts = () => {
    let totalProducts = 0;
    inventory.products.forEach((product) => {
      totalProducts += product.quantityInStock;
    });
    setTotalProducts(totalProducts);
  };

  const getTotalValue = () => {
    let totalValue = 0;
    inventory.products.forEach((product) => {
      totalValue += product.quantityInStock * 1000;
    });
    setTotalValue(totalValue);
  };

  const getStatus = () => {
    if (totalValue > 10000) {
      setStatus(true);
    } else {
      setStatus(false);
    }
  };

  const onShowDetails = () => {
    getAmountProducts();
    getTotalProducts();
    getTotalValue();
    getStatus();
  };

  useEffect(() => {
    onShowDetails();
    updateInventory();
  }, [openModal]);

  return (
    <>
      <div className="flex justify-center">
        <div className="bg-white mt-7 p-7 w-[60%] shadow-lg">
          <div className="flex flex-row justify-between">
            <div className="text-2xl">
              Inventario de la Tienda:{" "}
              <span className="font-bold">{store.name}</span>
            </div>
            <div className="text-sm">
              ID Inventario: <span className="font-bold">{inventory.id}</span>
            </div>
          </div>
          <div className="flex flex-row justify-between mt-5">
            <div className="text-lg flex flex-col">
              <div>
                Cantidad de Productos:{" "}
                <span className="font-bold">{amountProducts}</span>
              </div>
              <div>
                Total de productos en inventario:{" "}
                <span className="font-bold">{totalProducts}</span>
              </div>
            </div>
            <div className="text-lg flex flex-col">
              <div>
                Valor del Inventario:{" "}
                <span className="font-bold">${totalValue}</span>
              </div>
              <div className="flex flex-row gap-2">
                Estado:{" "}
                <div className="bg-blue-300 p-1 ml-2">
                  {status ? <AiOutlineArrowUp /> : <AiOutlineArrowDown />}
                </div>
              </div>
            </div>
            <div>
              <Button onClick={() => setOpenModal(!openModal)}>
                Ver Detalles
              </Button>
            </div>
          </div>
        </div>
      </div>
      {openModal && (
        <DetailsInventory
          setOpenModal={setOpenModal}
          openModal={openModal}
          products={inventory.products}
          updateInventory={updateInventory}
        />
      )}
    </>
  );
};

export default CardInventory;
