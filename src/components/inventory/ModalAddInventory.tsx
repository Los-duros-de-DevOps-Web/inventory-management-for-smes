import React, { useState, useEffect } from "react";
import useProducts from "@/hooks/useProducts";

import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { toast } from "react-hot-toast";

import TableProductsInv from "./TableProductsInv";
import ProductData from "@/types/ProductData";
import TableProductsAdded from "./TableProductsAdded";
import useInventory from "@/hooks/useInventory";

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

interface ModalAddInventoryProps {
  setOpenModal: (openModal: boolean) => void;
  openModal: boolean;
  storeId: number;
  updateInventory: () => void;
}

const ModalAddInventory = ({
  setOpenModal,
  openModal,
  storeId,
  updateInventory,
}: ModalAddInventoryProps) => {
  const handleClose = () => setOpenModal(false);

  const [allProducts, setAllProducts] = useState<ProductData[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<ProductData[]>([]);

  const fetchProducts = async () => {
    try {
      const response = await useProducts.useGetProducts();
      const products: ProductData[] = response.data;

      const filterProducts: ProductData[] = [];

      products.forEach((product: ProductData) => {
        if (product.quantityInStock !== 0) {
          if (product.inventoryId === null) {
            filterProducts.push(product);
          }
        }
      });

      setAllProducts(filterProducts);
    } catch (error) {
      toast.error("Error al cargar los productos");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [selectedProducts]);

  const onAddProduct = (product: ProductData) => {
    setSelectedProducts([...selectedProducts, product]);
  };

  const onDeletedProduct = (product: ProductData) => {
    setSelectedProducts(
      selectedProducts.filter((p: ProductData) => p.id !== product.id)
    );
  };

  const onAddInventory = async () => {
    try {
      const response = await useInventory.addInventory(storeId);

      selectedProducts.forEach(async (product: ProductData) => {
        await useInventory.addProductToInventory(response.data.id, product.id);
      });
      toast.success("Inventario agregado correctamente");
      setOpenModal(false);
      setSelectedProducts([]);
      fetchProducts();
      updateInventory();
    } catch (error) {
      toast.error("Error al agregar el inventario");
    }
  };

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
            Agregar Inventario
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Ingresa la información del inventario que deseas agregar
          </Typography>
          <div className="flex flex-row justify-around gap-6">
            <div className="text-center font-bold mt-8 border border-gray-400 p-5 rounded-lg">
              Productos Disponibles para agregar
              <TableProductsInv
                allProducts={allProducts}
                selectedProducts={selectedProducts}
                onAddProduct={onAddProduct}
              />
            </div>
            <div className="text-center font-bold mt-8 border border-blue-500 p-5 rounded-lg">
              Productos Agregados
              <TableProductsAdded
                selectedProducts={selectedProducts}
                onDeletedProduct={onDeletedProduct}
              />
            </div>
          </div>
          <div className="flex flex-row justify-center mt-5">
            <Button onClick={() => onAddInventory()}>Agregar Inventario</Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalAddInventory;
