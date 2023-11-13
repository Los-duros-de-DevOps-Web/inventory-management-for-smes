import ProductData from "./ProductData";

type OrderData = {
  id: number;
  date: Date;
  nameClient: string;
  total: number;
  storeId: number;
  Products: ProductData[];
};

export default OrderData;
