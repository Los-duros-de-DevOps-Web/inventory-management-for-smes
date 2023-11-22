import { Grid, Button, TextField } from "@mui/material";
import React, { useRef, useState } from "react";
import useProducts from "@/hooks/useProducts";

const dataProductForm = {
  productName: "",
  productDetails: "",
  quantityInStock: 0,
  lowStockRange: 0,
};

interface FormProductProps {
  setOpenForm: (open: boolean) => void;
  onUpdateProducts: () => void;
}

export const FormProduct = ({
  setOpenForm,
  onUpdateProducts,
}: FormProductProps) => {
  const [product, setProduct] = useState(dataProductForm);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileInputChange = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFile = event.target.files[0];
      console.log("Archivo seleccionado:", selectedFile);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
  };

  const onSubmit = async () => {
    setProduct(dataProductForm);
    await useProducts.useAddProduct(product);
    onUpdateProducts();
    setOpenForm(false);
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
                value={product.productDetails}
                fullWidth
                id="productDetails"
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
                value={product.quantityInStock}
                onChange={handleInputChange}
                name="quantityInStock"
                type="number"
                fullWidth
                id="quantityInStock"
                label="Cantidad a agregar"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={product.lowStockRange}
                onChange={handleInputChange}
                name="lowStockRange"
                type="number"
                fullWidth
                id="lowStockRange"
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
