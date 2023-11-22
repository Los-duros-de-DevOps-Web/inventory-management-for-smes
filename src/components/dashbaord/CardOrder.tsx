import { Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useOrder from "@/hooks/useOrder";
import OrderData from "@/types/OrderData";

interface CardValueProps {
  storeId: number;
}

const CardValue = ({ storeId }: CardValueProps) => {
  const router = useRouter();
  const [orders, setOrders] = useState<number | null>(null);
  useEffect(() => {
    const getOrders = async () => {
      const response = await useOrder.getOrderByStore(storeId);
      const orders: OrderData[] = response.data;
      setOrders(orders.length);
    };
    getOrders();
  }, []);
  return (
    <div className="shadow-md rounded-xl p-6 flex flex-col justify-center">
      <div className="text-center font-bold text-lg">
        Numero de Ordenes Activas
      </div>
      <div className="text-center text-xl">{orders}</div>
      <div className="flex flex-row justify-center gap-3 mt-5">
        <Button onClick={() => router.push("/orders")}>
          Gestionar Ordenes
        </Button>
      </div>
    </div>
  );
};

export default CardValue;
