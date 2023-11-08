import axios from "axios";
import StoreData from "@/types/StoreData";
import UserData from "@/types/UserData";

const useAddStore = async (nameStoreAdd: string, employeesAdd: UserData[]) => {
  const nameStore = nameStoreAdd;
  const employees = employeesAdd;

  return await axios.post(
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
};

const useGetStore = (storeId: number) => {
  return axios.get(`/api/store/${storeId}`);
};

const useStores = () => {
  return axios.get("/api/store");
};

const useStore = {
  useGetStore,
  useStores,
  useAddStore,
};

export default useStore;
