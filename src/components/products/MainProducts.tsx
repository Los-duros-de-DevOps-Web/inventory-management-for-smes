import React, { useEffect, useState } from "react";
import ListProducts from "./ListProducts";
import { Button } from "@mui/material";
import { FormProduct } from "./FormProduct";
import ProductData from "@/types/ProductData";
import { BsFillArrowDownSquareFill } from "react-icons/bs";
import useProducts from "@/hooks/useProducts";
import { toast } from "react-hot-toast";

const MainProducts = () => {
  const [openForm, setOpenForm] = useState(false);
  const [products, setProducts] = useState<ProductData[]>([]);

  const fetchProducts = async () => {
    try {
      const response = await useProducts.useGetProducts();
      const products: ProductData[] = response.data;
      setProducts(products);
    } catch (error) {
      toast.error("Error al cargar los productos");
    }
  };

  const onUpdateProducts = () => {
    fetchProducts();
  };

  useEffect(() => {
    onUpdateProducts();
  }, []);

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
      <div>
        {openForm && (
          <FormProduct
            setOpenForm={setOpenForm}
            onUpdateProducts={onUpdateProducts}
          />
        )}
      </div>
      <div>
        <ListProducts products={products} />
      </div>
    </>
  );
};

export default MainProducts;
