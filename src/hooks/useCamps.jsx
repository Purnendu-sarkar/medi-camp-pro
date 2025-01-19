import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useCamps = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: camp = [],
    isPending: loading,
    refetch,
  } = useQuery({
    queryKey: ["camp"],
    queryFn: async () => {
      const res = await axiosPublic.get("/camp");
      return res.data;
    },
  });
  return [camp, loading, refetch];
};

export default useCamps;
