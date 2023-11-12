import React, { useState, useEffect } from "react";
import ProductData from "@/types/ProductData";
import { Button } from "@mui/material";

interface TableProductsAddedProps {
  selectedProducts: ProductData[];
  onDeletedProduct: (product: ProductData) => void;
}

const TableProductsAdded = ({
  selectedProducts,
  onDeletedProduct,
}: TableProductsAddedProps) => {
  const [products, setProducts] = useState<ProductData[]>(selectedProducts);

  useEffect(() => {
    setProducts(selectedProducts);
  }, [selectedProducts]);

  const onDeleteProductList = (product: ProductData) => {
    setProducts(products.filter((p: ProductData) => p.id !== product.id));
    onDeletedProduct(product);
  };

  return (
    <>
      {products ? (
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 bg-white">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className="text-center">
              <th scope="col" className="px-6 py-3">
                Nombre Producto
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
            {products.map((product: ProductData, index: number) => {
              return (
                <tr key={index} className="text-center">
                  <td>{product.name}</td>
                  <td>{product.quantityInStock}</td>
                  <td className="flex justify-center gap-3">
                    <Button onClick={() => onDeleteProductList(product)}>
                      Eliminar
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div className="flex justify-center">
          <b className="text-3xl">No Existen Productos en tu Tienda</b>
        </div>
      )}
    </>
  );
};

export default TableProductsAdded;
