import axios from "axios";

const useAddNotify = (date: Date, description: string, productId: number) => {
  return axios.post("/api/notify/addNotify", {
    date,
    description,
    productId,
  });
};

const useGetNotify = () => {
  return axios.get("/api/notify/getNotify");
};

const useNotify = {
  useAddNotify,
  useGetNotify,
};

export default useNotify;
