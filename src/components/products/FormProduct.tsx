import { Grid, Button, TextField } from "@mui/material";
import React, { useRef, useState } from "react";
import useAddProduct from "@/hooks/useAddProduct";

const dataProduct = {
  productName: "",
  productDetails: "",
  quantityInStock: 0,
  lowStockRange: 0,
};

export const FormProduct = () => {
  const [product, setProduct] = useState(dataProduct);
  const fileInputRef: any = useRef(null);

  const handleFileInputChange = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelected = (event: any) => {
    const selectedFile = event.target.files[0];
    console.log("Archivo seleccionado:", selectedFile);
  };

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
  };

  const onSubmit = () => {
    useAddProduct(product);
  };
  return (
    <div className="w-[100%] flex justify-center ">
      <Grid container spacing={2} sx={{ width: "70%" }}>
        <Grid item xs={12} md={6} padding={2}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                value={product.productName}
                fullWidth
                name="productName"
                id="productName"
                onChange={handleInputChange}
                label="Nombre del Producto"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="outlined-multiline-flexible"
                name="productDetails"
                multiline
                onChange={handleInputChange}
                rows={4}
                label="Detalles del Producto"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={handleInputChange}
                name="quantityInStock"
                type="number"
                fullWidth
                id="outlined-multiline-flexible"
                label="Cantidad a agregar"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileSelected}
              />
              <Button fullWidth onClick={handleFileInputChange}>
                Subir Imagen
              </Button>
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={handleInputChange}
                name="lowStockRange"
                type="number"
                fullWidth
                id="outlined-multiline-flexible"
                label="Cantidad minima para notificar"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <Button fullWidth variant="contained" onClick={onSubmit}>
                Guardar
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6} padding={2}>
          <img
            src="https://source.unsplash.com/random"
            className="max-h-[470px] w-[100%] bg-cover"
          />
        </Grid>
      </Grid>
    </div>
  );
};
