import { Button } from "@mui/material";
import React, { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import useProducts from "@/hooks/useProducts";

const CardStock = () => {
  const [stocks, setStocks] = useState<number | null>(null);

  useEffect(() => {
    const getStocks = async () => {
      const response = await useProducts.getStocksProducts();
      const stocks = response.data;
      setStocks(stocks);
    };
    getStocks();
  }, []);

  const router = useRouter();
  return (
    <div className="shadow-md rounded-xl p-6 flex flex-col justify-center">
      <div className="text-center font-bold text-lg">
        Numero de Productos en Stock
      </div>
      <div className="text-center text-xl">{stocks}</div>
      <div className="flex flex-row justify-center gap-3 mt-5">
        <Button onClick={() => router.push("/products")}>
          Gestionar Productos
        </Button>
        <Button onClick={() => router.push("/inventory")}>
          Gestionar Inventario
        </Button>
      </div>
    </div>
  );
};

export default CardStock;
