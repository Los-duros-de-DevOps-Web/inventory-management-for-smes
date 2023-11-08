import axios from "axios";

const useAvailableEmp = () => {
  return axios.get("/api/employees/availableEmployees");
};

const useEmployeeByStore = (emStoreId: number) => {
  return axios.get(`/api/store/employee/${emStoreId}`);
};

const useAddEmployeeToStore = (emStoreId: number, idEmployeeAdd: number) => {
  return axios.post(`api/store/employee/${emStoreId}/add/${idEmployeeAdd}`);
};

const useDelEmployeeByStore = async (emStoreId: any, idEmployee: any) => {
  return await axios.delete(
    `/api/store/employee/${emStoreId}/del/${idEmployee}`
  );
};

const useEmployee = {
  useAvailableEmp,
  useEmployeeByStore,
  useAddEmployeeToStore,
  useDelEmployeeByStore,
};

export default useEmployee;
