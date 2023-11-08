import useSWR from "swr";

const useStores = () => {
  const { data, error, isLoading, mutate } = useSWR("/api/store");

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useStores;
