import React, { useState, useEffect } from "react";
import useProducts from "@/hooks/useProducts";
import ProductData from "@/types/ProductData";
import { toast } from "react-hot-toast";
import { Button } from "@mui/material";

interface TableProductsAddedProps {
  addedProducts: ProductData[];
  onDeletedProduct: (product: ProductData) => void;
}

const TableProductsAdded = ({
  addedProducts,
  onDeletedProduct,
}: TableProductsAddedProps) => {
  const [stProducts, setProducts] = useState<ProductData[]>([]);

  useEffect(() => {
    setProducts(addedProducts);
  }, [addedProducts]);

  const onDeleteProductList = (product: ProductData) => {
    setProducts(stProducts.filter((p: ProductData) => p.id !== product.id));
    onDeletedProduct(product);
  };

  return (
    <>
      {stProducts ? (
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
            {stProducts.map((product: ProductData, index: number) => {
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
