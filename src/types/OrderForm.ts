import ProductData from "@/types/ProductData";

type OrderForm = {
  date: Date;
  nameClient: string;
  total: number;
  store: number;
  selectedProducts: ProductData[];
  amountProductsAdded: number[];
};

export default OrderForm;
