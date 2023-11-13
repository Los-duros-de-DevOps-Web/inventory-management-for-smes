import OrderOnProductData from "./OrderOnProductData";
import StoreData from "./StoreData";

type OrderData = {
  id: number;
  date: Date;
  nameClient: string;
  total: number;
  OrderOnProducts: OrderOnProductData[];
  store: StoreData;
  storeId: number;
};

export default OrderData;
