import React, { useState, useEffect } from "react";

import { Button, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import TableProductsInv from "./TableProductsInv";
import ProductData from "@/types/ProductData";

import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TableProductsAdded from "./TableProductsAdded";

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
}

const ModalAddInventory = ({
  setOpenModal,
  openModal,
}: ModalAddInventoryProps) => {
  const handleClose = () => setOpenModal(false);

  const [addedProducts, setAddedProducts] = useState<ProductData[]>([]);
  const [backProduct, setBackProduct] = useState<ProductData | null>(null);

  const onAddedProduct = (product: ProductData) => {
    setAddedProducts([...addedProducts, product]);
  };

  const onDeleteProduct = (product: ProductData) => {};

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
                onAddedProduct={onAddedProduct}
                backProduct={backProduct as ProductData}
              />
            </div>
            <div className="text-center font-bold mt-8 border border-blue-500 p-5 rounded-lg">
              Productos Agregados
              <TableProductsAdded
                addedProducts={addedProducts}
                onDeletedProduct={onDeleteProduct}
              />
            </div>
          </div>
          <div className="flex flex-row justify-center mt-5">
            <Button>Agregar Inventario</Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalAddInventory;
