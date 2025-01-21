import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useRegisteredCamps = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    data: registeredCamps = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["registeredCamps", user?.email],
    queryFn: async () => {
      if (!user?.email) {
        return [];
      }
      const res = await axiosSecure.get(`/participants/${user.email}`);
      return res.data;
    },
  });

  return [registeredCamps, isLoading, refetch];
};

export default useRegisteredCamps;
