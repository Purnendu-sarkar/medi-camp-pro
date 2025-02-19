import { useState, useEffect } from "react";
import useAxiosPublic from "./useAxiosPublic";

const useFeedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await axiosPublic.get("/feedback");
        const feedbackData = res.data;

        const feedbackWithImages = await Promise.all(
          feedbackData.map(async (feedback) => {
            const campRes = await axiosPublic.get(`/camps/${feedback.campId}`);
            return { ...feedback, image: campRes.data.image };
          })
        );

        setFeedbacks(feedbackWithImages);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, [axiosPublic]);

  return { feedbacks, loading };
};

export default useFeedbacks;
