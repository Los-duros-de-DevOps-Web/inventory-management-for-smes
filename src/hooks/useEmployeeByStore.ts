import useSWR from "swr";

const useEmployeeByStore = (emStoreId: any) => {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/store/employee/${emStoreId}`
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useEmployeeByStore;
