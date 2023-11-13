import { Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import TableProducts from "./TableProducts";
import OrderData from "@/types/OrderData";

interface CardOrdersProps {
  order: OrderData;
}

const CardOrders = ({ order }: CardOrdersProps) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  return (
    <div className="bg-white shadow-lg m-5 p-5 w-[70%] flex flex-col justify-center mx-auto text-center">
      <div className="font-bold text-center text-2xl">Vista de Orden</div>
      <div className="flex flex-row justify-around gap-3 mt-5">
        <div className="flex flex-col gap-2">
          <div className="text-lg">
            Cliente: <span className="font-bold">{order.nameClient}</span>
          </div>
          <div className="text-sm">
            Id Order: <span className="font-bold">{order.id}</span>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="text-lg">
            Fecha: <span className="font-bold">{order.date.toString()}</span>
          </div>
          <div className="text-lg">
            Total de la factura:{" "}
            <span className="font-bold">${order.total}</span>
          </div>
        </div>
        <div>
          <Button onClick={() => setOpenModal(!openModal)}>
            Ver Productos
          </Button>
        </div>
      </div>
      {openModal && (
        <TableProducts
          openModal={openModal}
          setOpenModal={setOpenModal}
          products={order.OrderOnProducts}
        />
      )}
    </div>
  );
};

export default CardOrders;
