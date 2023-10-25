import fetcher from "@/libs/fetcher";
import useSWR from "swr";

const useGetStore = (emStoreId: any) => {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/store/employee/${emStoreId}`,
    fetcher
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useGetStore;
