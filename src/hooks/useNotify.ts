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

const deleteNotify = (notifyId: number) => {
  console.log(notifyId);

  return axios.delete(`/api/notify/del/${notifyId}`);
};

const useNotify = {
  useAddNotify,
  useGetNotify,
  deleteNotify,
};

export default useNotify;
