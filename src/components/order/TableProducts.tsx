import React from "react";

import { Modal, Box, Typography } from "@mui/material";
import OrderOnProductData from "@/types/OrderOnProductData";
import OrderData from "@/types/OrderData";

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

interface TableProductsProps {
  openModal: boolean;
  setOpenModal: (openModal: boolean) => void;
  products: OrderOnProductData[];
}

const TableProducts = ({
  openModal,
  setOpenModal,
  products,
}: TableProductsProps) => {
  const handleClose = () => setOpenModal(false);

  console.log(products);

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
            Productos de la Orden
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Revisa la información de los productos de la orden
          </Typography>
          <div>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 bg-white">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr className="text-center">
                  <th scope="col" className="px-6 py-3">
                    Nombre Producto
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Cantidad
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Valor
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product: OrderOnProductData, index: number) => {
                  return (
                    <tr key={index} className="text-center">
                      <td>{product.Product.name}</td>
                      <td>{product.amount}</td>
                      <td>{product.amount * 100}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default TableProducts;
