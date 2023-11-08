import axios from "axios";

const useGetStore = (storeId: number) => {
  return axios.get(`/api/store/${storeId}`);
};

const useStore = {
  useGetStore,
};

export default useStore;
