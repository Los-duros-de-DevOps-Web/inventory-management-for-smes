import axios from "axios";

const useAvailableEmp = () => {
  return axios.get("/api/employees/availableEmployees");
};

const useEmployee = {
  useAvailableEmp,
};

export default useEmployee;
