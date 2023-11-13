import axios from "axios";
import OrderForm from "@/types/OrderForm";

const addOrder = (order: OrderForm) => {
  console.log("Hook");
  console.log(order);

  return axios.post("api/order/addOrder", {
    order,
  });
};

const getOrderByStore = (orderStore: number) => {
  return axios.get(`api/order/${orderStore}`);
};

const useOrder = {
  addOrder,
  getOrderByStore,
};

export default useOrder;
