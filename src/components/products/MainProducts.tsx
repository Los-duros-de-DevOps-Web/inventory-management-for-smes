import { Button } from "@mui/material";
import React, { useState } from "react";
import { BsFillArrowDownSquareFill } from "react-icons/bs";
import { FormProduct } from "./FormProduct";
import ListProducts from "./ListProducts";

const MainProducts = () => {
  const [openForm, setOpenForm] = useState(false);
  return (
    <>
      <div className="mt-5 flex justify-center">
        <Button
          variant="contained"
          sx={{ padding: "18px" }}
          onClick={() => setOpenForm(!openForm)}
        >
          Agregar Producto{" "}
          <BsFillArrowDownSquareFill className="ml-2 w-4 h-4" />
        </Button>
      </div>
      <div>{openForm && <FormProduct />}</div>
      <div>
        <ListProducts />
      </div>
    </>
  );
};

export default MainProducts;
