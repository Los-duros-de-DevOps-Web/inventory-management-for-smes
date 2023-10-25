import axios from "axios";

const useDelEmployeeByStore = async (emStoreId: any, idEmployee: any) => {
  const response = await axios.delete(
    `/api/store/employee/${emStoreId}/del/${idEmployee}`
  );
  return response.data;
};

export default useDelEmployeeByStore;
