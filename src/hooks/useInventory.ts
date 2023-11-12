import axios from "axios";

const getInventory = (storeId: number) => {
  return axios.get(`/api/inventory/${storeId}`);
};

const addInventory = (storeId: number) => {
  return axios.post(`/api/inventory/addInventory`, {
    storeId: storeId,
  });
};

const addProductToInventory = (inventoryId: number, productId: number) => {
  return axios.put(`/api/inventory/addProduct`, {
    inventoryId: inventoryId,
    productId: productId,
  });
};

const deleteProductFromInventory = (productId: number) => {
  return axios.delete(`/api/inventory/del/${productId}`);
};

const useInventory = {
  getInventory,
  addInventory,
  addProductToInventory,
  deleteProductFromInventory,
};

export default useInventory;
