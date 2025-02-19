import { useState } from "react";
import useAxiosPublic from "./useAxiosPublic";

const useUpcomingCamps = () => {
  const [upcomingCamps, setUpcomingCamps] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();

  const fetchUpcomingCamps = async () => {
    // setLoading(true);
    try {
      const res = await axiosPublic.get("/camp");
      const allCamps = res.data;

      const currentDate = new Date();
      const filteredCamps = allCamps.filter((camp) => {
        const campDate = new Date(camp.date);
        return campDate >= currentDate;
      });

      const sortedCamps = filteredCamps.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA - dateB;
      });

      setUpcomingCamps(sortedCamps);
    } catch (error) {
      console.error("Error fetching upcoming camps:", error);
    } finally {
      setLoading(false);
    }
  };

  return { upcomingCamps, fetchUpcomingCamps, loading };
};

export default useUpcomingCamps;
