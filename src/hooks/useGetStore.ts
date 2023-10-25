import fetcher from "@/libs/fetcher";
import useSWR from "swr";

const useGetStore = (storeId: any) => {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/store/${storeId}`,
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
