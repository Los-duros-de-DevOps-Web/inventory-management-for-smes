import useSWR from "swr";

import fetcher from "@/libs/fetcher";

const useStores = () => {
  const { data, error, isLoading, mutate } = useSWR("/api/store", fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useStores;
