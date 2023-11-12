import React, { useState, useEffect } from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import ProductData from "@/types/ProductData";
import useInventory from "@/hooks/useInventory";
import { toast } from "react-hot-toast";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface DetailsInventoryProps {
  setOpenModal: (openModal: boolean) => void;
  openModal: boolean;
  products: ProductData[];
  updateInventory: () => void;
}

const DetailsInventory = ({
  setOpenModal,
  openModal,
  products,
  updateInventory,
}: DetailsInventoryProps) => {
  const [stProducts, setProducts] = useState<ProductData[]>(products);

  useEffect(() => {
    setProducts(products);
  }, [products]);

  const onDeletedProduct = async (product: ProductData) => {
    try {
      await useInventory.deleteProductFromInventory(product.id);
      setProducts(stProducts.filter((p: ProductData) => p.id !== product.id));
      updateInventory();
      toast.success("Producto eliminado exitosamente");
    } catch (error) {
      toast.error("Error al eliminar el producto");
    }
  };

  useEffect(() => {
    setProducts(products);
    updateInventory();
  }, [openModal]);

  const handleClose = () => setOpenModal(false);
  return (
    <div>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h4" component="h2">
            Editar Inventario
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Ingresa la información del inventario que deseas agregar
          </Typography>
          <div className="flex flex-row justify-around gap-6">
            <div className="text-center font-bold mt-8 border border-blue-500 p-5 rounded-lg">
              Productos Agregados
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
                        Eliminar
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
                            <Button onClick={() => onDeletedProduct(product)}>
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
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default DetailsInventory;
