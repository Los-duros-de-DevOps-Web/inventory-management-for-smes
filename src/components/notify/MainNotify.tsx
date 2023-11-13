import React, { useState, useEffect } from "react";
import ProductData from "@/types/ProductData";
import useProducts from "@/hooks/useProducts";
import { toast } from "react-hot-toast";
import CardNotify from "./CardNotify";
import ActiveNotify from "./ActiveNotify";
import useNotify from "@/hooks/useNotify";
import NotifyData from "@/types/NotifyData";

const MainNotify = () => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [notify, setNotify] = useState<NotifyData[]>([]);

  const fetchProducts = async () => {
    try {
      const response = await useProducts.useGetLowProducts();
      const products = response.data;
      setProducts(products);
    } catch (error) {
      toast.error("Error al cargar los productos");
    }
  };

  const fetchNotify = async () => {
    try {
      const response = await useNotify.useGetNotify();
      const notify: NotifyData[] = response.data;
      setNotify(notify);
    } catch (error) {
      toast.error("Error al cargar las notificaciones");
    }
  };

  const updateAlarma = () => {
    fetchProducts();
    fetchNotify();
  };

  const onDeletedAlarm = async (notify: NotifyData) => {
    try {
      await useNotify.deleteNotify(notify.id);
      toast.success("Alarma eliminada");
      updateAlarma();
    } catch (error) {
      toast.error("Error al eliminar la alarma");
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchNotify();
  }, []);

  return (
    <div className="flex flex-row justify-between gap-5">
      <div className="w-[60%]">
        {products &&
          products.map((product: ProductData, index: number) => (
            <CardNotify
              key={index}
              product={product}
              updateAlarma={updateAlarma}
            />
          ))}
      </div>
      <div className="w-[40%] h-[600px] overflow-y-auto">
        {notify &&
          notify.map((notify: NotifyData, index: number) => (
            <ActiveNotify
              key={index}
              notify={notify}
              onDeletedAlarm={onDeletedAlarm}
            />
          ))}
      </div>
    </div>
  );
};

export default MainNotify;
