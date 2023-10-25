import * as React from "react";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ModalEditEmployee = ({ setOpenModal, openModal, storeId }: any) => {
  const handleClose = () => setOpenModal(false);

  console.log(storeId + "Perra");

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
            Crear Tienda
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            A continuación deberás de ingresar la información para la tienda
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalEditEmployee;
