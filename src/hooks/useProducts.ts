import axios from "axios";

const useAddProduct = async (productForm: any) => {
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

const useProducts = {
  useAddProduct,
  useGetProducts,
};

export default useProducts;
