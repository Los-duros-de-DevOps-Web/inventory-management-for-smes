import useSWR from "swr";

//import fetcher from "@/libs/fetcher";

const useEmployees = () => {
  const { data, error, isLoading, mutate } = useSWR("/api/employees");

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useEmployees;
