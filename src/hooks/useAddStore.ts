import axios from "axios";

const useAddStore = async (store: any) => {
  const nameStore = store.nameStore;
  const employees = store.employees;

  const response = await axios.post(
    "api/store/addStore",
    {
      nameStore,
      employees,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};

export default useAddStore;
