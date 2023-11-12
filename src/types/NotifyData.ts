import ProductData from "./ProductData";

type NotifyData = {
  id: number;
  date: Date;
  description: string;
  productId: number;
  product: ProductData;
};

export default NotifyData;
