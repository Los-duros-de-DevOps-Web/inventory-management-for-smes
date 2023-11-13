import React, { useState, useEffect, use } from "react";
import ProductData from "@/types/ProductData";
import useProducts from "@/hooks/useProducts";

import { TextField, Button } from "@mui/material";
import { toast } from "react-hot-toast";
import useOrder from "@/hooks/useOrder";
import OrderForm from "@/types/OrderForm";

interface FormAddOrderProps {
  products: ProductData[];
  storeId: number;
  setOpenModal: (openModal: boolean) => void;
  updateProducts: () => void;
}

const FormAddOrder = ({
  products,
  storeId,
  setOpenModal,
  updateProducts,
}: FormAddOrderProps) => {
  const [nameClient, setNameClient] = useState<string>("");
  const [selectedProducts, setSelectedProducts] = useState<ProductData[]>([]);
  const [amountProductsAdded, setAmountProductsAdded] = useState<number[]>([]);
  const [totalOrder, setTotalOrder] = useState<number>(0);

  const [addedQuantityProduct, setAddedQuantityProduct] = useState<number>(0);
  const [selectProduct, setSelectProduct] = useState<ProductData | null>(null);
  const [totalAdded, setTotalAdded] = useState<number>(0);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameClient(event.target.value);
  };

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddedQuantityProduct(Number(event.target.value));
  };

  const updateValueTotalAdded = () => {
    setTotalAdded(addedQuantityProduct * 100);
  };

  const updateValueTotalOrder = () => {
    setTotalOrder(totalOrder + totalAdded);
  };

  useEffect(() => {
    updateValueTotalAdded();
  }, [addedQuantityProduct]);

  const addedProductsToOrder = (product: ProductData, amount: number) => {
    setSelectedProducts([...selectedProducts, product]);
    setAmountProductsAdded([...amountProductsAdded, amount]);
    updateValueTotalOrder();
    setSelectProduct(null);
    setAddedQuantityProduct(0);
    setTotalAdded(0);
  };

  const onMinusProductsInStock = () => {
    selectedProducts.forEach(async (product: ProductData, index: number) => {
      const newQuantityInStock =
        product.quantityInStock - amountProductsAdded[index];
      try {
        await useProducts.useMinusStock(product.id, newQuantityInStock);
      } catch (error) {
        toast.error("Error al actualizar el stock");
      }
    });
  };

  const onAddOrder = async () => {
    onMinusProductsInStock();
    const orderDataToAdd: OrderForm = {
      date: new Date(),
      nameClient,
      total: totalOrder,
      store: storeId,
      selectedProducts: selectedProducts,
      amountProductsAdded: amountProductsAdded,
    };
    try {
      await useOrder.addOrder(orderDataToAdd);
      toast.success("Orden agregada correctamente");
      setOpenModal(false);
      updateProducts();
    } catch (error) {
      toast.error("Error al agregar la orden");
    }
  };

  return (
    <div>
      <div className="flex flex-row justify-around mt-5">
        <div className="w-[60%]">
          <TextField
            value={nameClient}
            fullWidth
            name="nameClient"
            id="nameClient"
            onChange={handleInputChange}
            label="Nombre del Cliente"
            variant="outlined"
          />
        </div>
        <div className="w-[20%]">
          Total de la orden: <span className="font-bold">${totalOrder}</span>
        </div>
      </div>
      <div>
        {selectProduct && (
          <div className="flex flex-row justify-around gap-4 mt-5">
            <div>Producto: {selectProduct.name}</div>
            <div className="w-[300px]">
              <TextField
                value={addedQuantityProduct}
                onChange={handleValueChange}
                name="addedQuantityProduct"
                type="number"
                fullWidth
                id="addedQuantityProduct"
                label="Cantidad a agregar"
                variant="outlined"
              />
            </div>
            <div>
              Total a agregar: <span className="font-bold">${totalAdded}</span>
            </div>
            <div>
              <Button
                onClick={() =>
                  addedProductsToOrder(selectProduct, addedQuantityProduct)
                }
              >
                Agregar
              </Button>
            </div>
          </div>
        )}
      </div>
      <div className="mt-5 flex flex-col justify-center">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 bg-white">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className="text-center">
              <th scope="col" className="px-6 py-3">
                Producto
              </th>
              <th scope="col" className="px-6 py-3">
                Stock
              </th>
              <th scope="col" className="px-6 py-3">
                Accion
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product: ProductData) => (
              <tr key={product.id} className="text-center">
                <td>{product.name}</td>
                <td>{product.quantityInStock}</td>
                <td className="flex justify-center gap-3">
                  <Button onClick={() => setSelectProduct(product)}>
                    Seleccionar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-row justify-center mt-5">
        <Button onClick={() => onAddOrder()}>Agregar Orden</Button>
      </div>
    </div>
  );
};

export default FormAddOrder;
