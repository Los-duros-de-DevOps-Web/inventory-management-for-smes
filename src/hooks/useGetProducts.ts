import useSWR from "swr";

//import fetcher from "@/libs/fetcher";

const useGetProducts = () => {
  const { data, error, isLoading, mutate } = useSWR("/api/products");

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useGetProducts;
