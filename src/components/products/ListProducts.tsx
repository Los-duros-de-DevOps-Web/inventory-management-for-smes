import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import ProductData from "@/types/ProductData";

interface ListProductsProps {
  products: ProductData[];
}

const ListProducts = ({ products }: ListProductsProps) => {
  const [stProducts, setProducts] = useState<ProductData[]>([]);

  useEffect(() => {
    setProducts(products);
  }, [products]);

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
                Inventario
              </th>
              <th scope="col" className="px-6 py-3">
                Stock de Alerta
              </th>
              <th scope="col" className="px-6 py-3">
                Editar
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product: any, index: number) => {
              return (
                <tr key={index} className="text-center">
                  <td>{product.name}</td>
                  <td>{product.quantityInStock}</td>
                  {product.inventory ? (
                    <td>{product.inventory}</td>
                  ) : (
                    <td>No tiene Inventario</td>
                  )}
                  <td>{product.lowStockRange}</td>
                  <td>
                    <Button>Editar</Button>
                    <Button>Eliminar</Button>
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

export default ListProducts;
