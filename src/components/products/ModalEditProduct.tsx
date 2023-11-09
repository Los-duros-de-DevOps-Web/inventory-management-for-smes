import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import useProducts from "@/hooks/useProducts";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField, Button } from "@mui/material";
import ProductData from "@/types/ProductData";

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

interface ModalEditProductProps {
  openModal: boolean;
  setOpenModal: (openModal: boolean) => void;
  product: ProductData;
  onUpdateProducts: () => void;
}

const ModalEditProduct = ({
  openModal,
  setOpenModal,
  product,
  onUpdateProducts,
}: ModalEditProductProps) => {
  const [productEdit, setProductEdit] = useState(product);

  const handleClose = () => setOpenModal(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProductEdit({ ...productEdit, [name]: value });
  };

  const submitEditProduct = async () => {
    await useProducts.useUpdateProduct(product.id, productEdit);
    onUpdateProducts();
    setOpenModal(false);
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
            Editar Producto
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            A continuación podrás ingresar los datos del producto
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ m: 4, fontWeight: "bold", textAlign: "center", fontSize: 23 }}
          >
            Estas editando el Producto: {product.name}
          </Typography>

          <div className="w-[100%] flex justify-center flex-col gap-5 ">
            <TextField
              value={productEdit.details}
              onChange={handleInputChange}
              fullWidth
              id="details"
              name="details"
              multiline
              rows={4}
              label="Detalles del Producto"
              variant="outlined"
            />
            <div className="flex justify-around gap-3">
              <TextField
                value={productEdit.quantityInStock}
                onChange={handleInputChange}
                name="quantityInStock"
                type="number"
                fullWidth
                id="quantityInStock"
                label="Cantidad a agregar"
                variant="outlined"
              />
              <TextField
                value={productEdit.lowStockRange}
                onChange={handleInputChange}
                name="lowStockRange"
                type="number"
                fullWidth
                id="lowStockRange"
                label="Cantidad minima para notificar"
                variant="outlined"
              />
            </div>
            <Button
              fullWidth
              variant="contained"
              onClick={() => submitEditProduct()}
            >
              Guardar
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalEditProduct;
