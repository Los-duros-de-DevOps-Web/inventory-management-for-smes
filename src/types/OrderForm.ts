import ProductData from "@/types/ProductData";

type OrderForm = {
  date: Date;
  nameClient: string;
  total: number;
  store: number;
  selectedProducts: ProductData[];
};

export default OrderForm;
