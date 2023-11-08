import axios from "axios";

const useAddProduct = async (product: any) => {
  const productName = product.productName;
  const productDetails = product.productDetails;
  const quantityInStock: number = product.quantityInStock;
  const lowStockRange: number = product.lowStockRange;

  console.log(product);

  const response = await axios.post(
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
  return response.data;
};

export default useAddProduct;
