import React, { useState, useEffect } from "react";

import useProducts from "@/hooks/useProducts";
import StoreData from "@/types/StoreData";
import { Button } from "@mui/material";
import CardAddOrder from "./CardAddOrder";
import ProductData from "@/types/ProductData";
import { toast } from "react-hot-toast";

interface MainOrderProps {
  storeData: StoreData;
}

const MainOrder = ({ storeData }: MainOrderProps) => {
  const [openAddOrder, setOpenAddOrder] = useState<boolean>(false);
  const [products, setProducts] = useState<ProductData[]>([]);

  const fetchProducts = async () => {
    try {
      const response = await useProducts.useGetProducts();
      const productsData: ProductData[] = response.data;
      setProducts(productsData);
    } catch (error) {
      toast.error("Error al cargar los productos");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <div>
        <div className="flex flex-row justify-center mt-5">
          <Button
            variant="contained"
            color="primary"
            sx={{ padding: 2, borderRadius: 4 }}
            onClick={() => setOpenAddOrder(!openAddOrder)}
          >
            Nueva Orden
          </Button>
        </div>
      </div>
      {openAddOrder && (
        <CardAddOrder
          openModal={openAddOrder}
          setOpenModal={setOpenAddOrder}
          products={products}
        />
      )}
    </div>
  );
};

export default MainOrder;
