import ProductData from "./ProductData";
import StoreData from "./StoreData";

type InventoryData = {
  id: number;
  products: ProductData[];
  store: StoreData;
  storeId: number;
};

export default InventoryData;
