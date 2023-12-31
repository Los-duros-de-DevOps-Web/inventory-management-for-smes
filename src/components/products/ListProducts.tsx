import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import ProductData from "@/types/ProductData";
import useProducts from "@/hooks/useProducts";
import ModalEditProduct from "./ModalEditProduct";

interface ListProductsProps {
  products: ProductData[];
  onUpdateProducts: () => void;
}

const ListProducts = ({ products, onUpdateProducts }: ListProductsProps) => {
  const [stProducts, setProducts] = useState<ProductData[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedPoroduct, setSelectedProduct] = useState<ProductData | null>(
    null
  );

  useEffect(() => {
    setProducts(products);
  }, [products]);

  const deleteProduct = async (id: number) => {
    await useProducts.useDeleteProduct(id);
    setProducts(stProducts.filter((product: ProductData) => product.id !== id));
  };

  const selectProduct = (product: ProductData) => {
    setOpenModal(!openModal);
    setSelectedProduct(product);
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
            {stProducts.map((product: ProductData, index: number) => {
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
                  <td className="flex justify-center gap-3">
                    <Button onClick={() => selectProduct(product)}>
                      Editar
                    </Button>
                    <Button
                      sx={{ color: "red" }}
                      onClick={() => deleteProduct(product.id)}
                    >
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
      {selectedPoroduct && (
        <ModalEditProduct
          openModal={openModal}
          setOpenModal={setOpenModal}
          product={selectedPoroduct}
          onUpdateProducts={onUpdateProducts}
        />
      )}
    </>
  );
};

export default ListProducts;
