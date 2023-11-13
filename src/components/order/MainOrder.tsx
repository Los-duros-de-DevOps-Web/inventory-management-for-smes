import React, { useState, useEffect } from "react";

import useProducts from "@/hooks/useProducts";
import StoreData from "@/types/StoreData";
import { Button } from "@mui/material";
import CardAddOrder from "./CardAddOrder";
import ProductData from "@/types/ProductData";
import { toast } from "react-hot-toast";
import OrderData from "@/types/OrderData";
import useOrder from "@/hooks/useOrder";
import CardOrders from "./CardOrders";

interface MainOrderProps {
  storeData: StoreData;
}

const MainOrder = ({ storeData }: MainOrderProps) => {
  const [openAddOrder, setOpenAddOrder] = useState<boolean>(false);
  const [products, setProducts] = useState<ProductData[]>([]);
  const [orders, setOrders] = useState<OrderData[]>([]);

  const fetchProducts = async () => {
    try {
      const response = await useProducts.useGetProducts();
      const productsData: ProductData[] = response.data;
      setProducts(productsData);
    } catch (error) {
      toast.error("Error al cargar los productos");
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await useOrder.getOrderByStore(storeData.id);
      const ordersData: OrderData[] = response.data;
      setOrders(ordersData);
    } catch (error) {
      toast.error("Error al cargar las ordenes");
    }
  };

  const updateProducts = () => {
    fetchProducts();
    fetchOrders();
  };

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);

  return (
    <div>
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
            storeId={storeData.id}
            updateProducts={updateProducts}
          />
        )}
      </div>
      <div>
        {orders &&
          orders.map((order: OrderData, index: number) => (
            <CardOrders order={order} key={index} />
          ))}
      </div>
    </div>
  );
};

export default MainOrder;
