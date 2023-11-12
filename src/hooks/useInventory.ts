import axios from "axios";

const getInventory = (storeId: number) => {
  return axios.get(`/api/inventory/${storeId}`);
};

const useInventory = {};

export default useInventory;
