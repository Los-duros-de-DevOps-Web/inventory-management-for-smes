import { Button } from "@mui/material";
import React, { useState } from "react";
import { parse } from "json2csv";
import { saveAs } from "file-saver";

import { toast } from "react-hot-toast";
import useEmployee from "@/hooks/useEmployee";
import ProductData from "@/types/ProductData";
import OrderData from "@/types/OrderData";
import InventoryData from "@/types/InventoryData";
import useProducts from "@/hooks/useProducts";
import useOrder from "@/hooks/useOrder";
import useInventory from "@/hooks/useInventory";

interface MainReportsProps {
  storeId: number;
}

const MainReports = ({ storeId }: MainReportsProps) => {
  const [employees, setEmployees] = useState<any[]>([]);
  const [products, setProducts] = useState<ProductData[]>([]);
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [inventory, setInventory] = useState<InventoryData[]>([]);

  const getEmployees = async () => {
    try {
      const response = await useEmployee.useEmployeeByStore(storeId);
      const employees = response.data;

      employees.forEach((employee: any) => {
        delete employee.password;
      });
      setEmployees(employees);
    } catch (error) {
      toast.error("Error al cargar los empleados");
    }
  };

  const downloadEmployees = () => {
    getEmployees();
    const fields = ["id", "username", "name", "role", "storeId"];
    const csvData = parse(employees, { fields });
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "employees.csv");
  };

  const getProducts = async () => {
    try {
      const response = await useProducts.useGetProducts();
      const products: ProductData[] = response.data;
      setProducts(products);
    } catch (error) {
      toast.error("Error al cargar los productos");
    }
  };
  const downloadProducts = () => {
    getProducts();
    const fields = [
      "id",
      "name",
      "details",
      "quantityInStock",
      "lowStockRange",
    ];
    const csvData = parse(products, { fields });

    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "products.csv");
  };

  const getOrders = async () => {
    try {
      const response = await useOrder.getOrderByStore(storeId);
      const order: OrderData[] = response.data;
      setOrders(order);
    } catch (error) {
      toast.error("Error al cargar las ordenes");
    }
  };
  const downloadOrders = () => {
    getOrders();
    const fields = [
      "id",
      "date",
      "nameClient",
      "storeId",
      "total",
      "OrderOnProducts",
    ];
    const csvData = parse(orders, { fields });

    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "orders.csv");
  };

  const getInventory = async () => {
    try {
      const response = await useInventory.getInventory(storeId);
      const inventory: InventoryData[] = response.data;
      setInventory(inventory);
    } catch (error) {
      toast.error("Error al cargar los inventario");
    }
  };
  const downloadInventory = () => {
    getInventory();
    const fields = ["id", "storeId", "products"];
    const csvData = parse(inventory, { fields });
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "invetory.csv");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-row justify-around bg-white shadow-lg p-5 gap-4">
        <div className="flex flex-col gap-3">
          <Button onClick={() => downloadEmployees()}>
            Reporte de Empleados
          </Button>
          <Button onClick={() => downloadProducts()}>
            Reporte de Productos
          </Button>
        </div>
        <div className="flex flex-col gap-3">
          <Button onClick={() => downloadOrders()}>Reporte de Ordenes</Button>
          <Button onClick={() => downloadInventory()}>
            Reporte de Inventario
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MainReports;
