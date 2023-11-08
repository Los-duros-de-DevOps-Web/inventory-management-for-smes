type ProductData = {
  id: number;
  name: string;
  details: string;
  quantityInStock: number;
  image?: string;
  lowStockRange: number;
  inventory?: any;
  inventoryId?: number;
  lowStockAlarms: any[];
};

export default ProductData;
