import React, { useState, useEffect } from "react";
import useProducts from "@/hooks/useProducts";
import ProductData from "@/types/ProductData";
import { toast } from "react-hot-toast";
import { Button } from "@mui/material";

interface TableProductsInvProps {
  onAddedProduct: (product: ProductData) => void;
  backProduct: ProductData;
}

const TableProductsInv = ({
  onAddedProduct,
  backProduct,
}: TableProductsInvProps) => {
  const [stProducts, setProducts] = useState<ProductData[]>([]);

  const [selectedProducts, setSelectedProducts] = useState<ProductData[]>([]);

  const fetchProducts = async () => {
    try {
      const response = await useProducts.useGetProducts();
      const products: ProductData[] = response.data;
      const filterProduct = products.filter(
        (product: ProductData) =>
          product.quantityInStock > 0 || product.inventory
      );
      setProducts(filterProduct);
    } catch (error) {
      toast.error("Error al cargar los productos");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (backProduct) {
      setProducts([...stProducts, backProduct]);
    }
  }, [backProduct]);

  const AddProduct = (product: ProductData) => {
    setSelectedProducts([...selectedProducts, product]);
    setProducts(stProducts.filter((p: ProductData) => p.id !== product.id));
    onAddedProduct(product);
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
                Stock de Alerta
              </th>
              <th scope="col" className="px-6 py-3">
                Editar
              </th>
            </tr>
          </thead>
          <tbody>
            {stProducts.map((product: ProductData, index: number) => {
              return (
                <tr key={index} className="text-center">
                  <td>{product.name}</td>
                  <td>{product.quantityInStock}</td>
                  <td>{product.lowStockRange}</td>
                  <td className="flex justify-center gap-3">
                    <Button onClick={() => AddProduct(product)}>Agregar</Button>
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

export default TableProductsInv;
