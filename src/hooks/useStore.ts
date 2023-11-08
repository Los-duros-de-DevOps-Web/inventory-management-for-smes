import axios from "axios";

const useGetStore = (storeId: number) => {
  return axios.get(`/api/store/${storeId}`);
};

const useStores = () => {
  return axios.get("/api/store");
};

const useStore = {
  useGetStore,
  useStores,
};

export default useStore;
