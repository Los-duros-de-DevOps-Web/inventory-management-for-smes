import React, { useState, useEffect } from "react";

import { Modal, Box, Typography, Button } from "@mui/material";
import { TextField } from "@mui/material";
import ProductData from "@/types/ProductData";
import FormAddOrder from "./FormAddOrder";

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

interface CardAddOrderProps {
  openModal: boolean;
  setOpenModal: (openModal: boolean) => void;
  products: ProductData[];
  storeId: number;
}

const CardAddOrder = ({
  openModal,
  setOpenModal,
  products,
  storeId,
}: CardAddOrderProps) => {
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
            Crear Nueva Orden
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Ingresa la información de la orden a agregar
          </Typography>
          <FormAddOrder products={products} storeId={storeId} />
        </Box>
      </Modal>
    </div>
  );
};

export default CardAddOrder;
