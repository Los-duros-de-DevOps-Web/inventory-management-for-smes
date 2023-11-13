import React, { useState, useEffect } from "react";
import ProductData from "@/types/ProductData";

import { TextField, Button } from "@mui/material";

interface FormAddOrderProps {
  products: ProductData[];
}

const FormAddOrder = ({ products }: FormAddOrderProps) => {
  const [nameClient, setNameClient] = useState<string>("");
  const [selectedProducts, setSelectedProducts] = useState<ProductData[]>([]);
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
              <Button>Agregar</Button>
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
    </div>
  );
};

export default FormAddOrder;
