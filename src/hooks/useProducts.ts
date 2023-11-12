import axios from "axios";

type ProductForm = {
  productName: string;
  productDetails: string;
  quantityInStock: number;
  lowStockRange: number;
};

import ProductData from "@/types/ProductData";

const useAddProduct = async (productForm: ProductForm) => {
  const productName = productForm.productName;
  const productDetails = productForm.productDetails;
  const quantityInStock: number = productForm.quantityInStock;
  const lowStockRange: number = productForm.lowStockRange;

  return await axios.post(
    "api/products/addProduct",
    {
      productName,
      productDetails,
      quantityInStock,
      lowStockRange,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

const useGetProducts = () => {
  return axios.get("/api/products");
};

const useDeleteProduct = (delProduct: number) => {
  return axios.delete(`/api/products/delete/${delProduct}`);
};

const useUpdateProduct = (productID: number, productForm: ProductData) => {
  const productDetails = productForm.details;
  const quantityInStock: number = productForm.quantityInStock;
  const lowStockRange: number = productForm.lowStockRange;

  return axios.put(
    `/api/products/editProduct`,
    {
      productID,
      productDetails,
      quantityInStock,
      lowStockRange,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

const useGetLowProducts = () => {
  return axios.get("/api/products/lowProducts");
};

const useProducts = {
  useAddProduct,
  useGetProducts,
  useDeleteProduct,
  useUpdateProduct,
  useGetLowProducts,
};

export default useProducts;
