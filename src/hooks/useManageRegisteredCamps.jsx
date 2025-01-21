import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useManageRegisteredCamps = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: registeredCamps = [],
    isLoading: loading,
    refetch,
  } = useQuery({
    queryKey: ["registeredCamps"],
    queryFn: async () => {
      const res = await axiosSecure.get("/participants");
      return res.data;
    },
  });

  return [registeredCamps, loading, refetch];
};

export default useManageRegisteredCamps;
