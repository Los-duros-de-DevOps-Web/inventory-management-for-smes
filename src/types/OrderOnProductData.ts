import ProductData from "./ProductData";
import OrderData from "./OrderData";

type OrderOnProductData = {
  orderId: number;
  productId: number;
  amount: number;
  Product: ProductData;
  Order: OrderData;
};

export default OrderOnProductData;
