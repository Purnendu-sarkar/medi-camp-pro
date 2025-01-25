import { useState } from "react";
import useAxiosPublic from "./useAxiosPublic";

const useUpcomingCamps = () => {
  const [upcomingCamps, setUpcomingCamps] = useState([]);
  const axiosPublic = useAxiosPublic();

  const fetchUpcomingCamps = async () => {
    try {
      const res = await axiosPublic.get("/camp");
      const allCamps = res.data;

      const currentDate = new Date();
      const filteredCamps = allCamps.filter((camp) => {
        const campDate = new Date(camp.date);
        return campDate > currentDate;
      });

      setUpcomingCamps(filteredCamps);
    } catch (error) {
      console.error("Error fetching upcoming camps:", error);
    }
  };

  return { upcomingCamps, fetchUpcomingCamps };
};

export default useUpcomingCamps;
