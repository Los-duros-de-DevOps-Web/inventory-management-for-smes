import useSWR from "swr";

import fetcher from "@/libs/fetcher";

const useAvailableEmp = () => {
  const { data, error, isLoading, mutate } = useSWR(
    "/api/employees/availableEmployees",
    fetcher
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useAvailableEmp;
