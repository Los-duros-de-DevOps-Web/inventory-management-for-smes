import axios from "axios";
import OrderForm from "@/types/OrderForm";

const addOrder = (order: OrderForm) => {
  console.log("Hook");
  console.log(order);

  return axios.post("api/order/addOrder", {
    order,
  });
};

const useOrder = {
  addOrder,
};

export default useOrder;
