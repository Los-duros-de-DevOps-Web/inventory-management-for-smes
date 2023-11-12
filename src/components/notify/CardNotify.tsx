import ProductData from "@/types/ProductData";
import { Button } from "@mui/material";
import React from "react";
import useNotify from "@/hooks/useNotify";
import { toast } from "react-hot-toast";

interface CardNotifyProps {
  product: ProductData;
  updateAlarma: () => void;
}

const CardNotify = ({ product, updateAlarma }: CardNotifyProps) => {
  const addNotification = async () => {
    try {
      const date = new Date();
      const description = `El producto ${product.name} bajo de su limite de stock`;
      await useNotify.useAddNotify(date, description, product.id);
      toast.success("Alarma activada");
      updateAlarma();
    } catch (error) {
      toast.error("Error al activar la alarma");
    }
  };
  return (
    <div className="flex flex-row justify-center">
      <div className="bg-white p-7 mt-4 w-[70%] shadow-lg">
        <div className="font-bold text-2xl">Gestionar Alarma</div>
        <div className="flex flex-row justify-around mt-6 gap-3 align-middle">
          <div className="text-xl">
            Producto: <span className="font-bold">{product.name}</span>
            <p className="text-sm">
              Id: <span>{product.id}</span>
            </p>
          </div>
          <div className="text-lg">
            <div>
              Cantidad en Stock:{" "}
              <span className="font-bold text-red-600">
                {product.quantityInStock}
              </span>
            </div>
            <div>
              Limite: <span className="font-bold">{product.lowStockRange}</span>
            </div>
          </div>
          <Button onClick={addNotification}>Activar Alarma</Button>
        </div>
      </div>
    </div>
  );
};

export default CardNotify;
