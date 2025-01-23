import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const FeedbackModal = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const camp = location.state?.camp;
  const [feedbackData, setFeedbackData] = useState({
    rating: "",
    feedback: "",
  });

  if (!camp) {
    return <p>Invalid access. No camp information found.</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { rating, feedback } = feedbackData;

    if (!rating || rating < 1 || rating > 5 || !feedback) {
      Swal.fire(
        "Invalid input",
        "Please provide valid rating and feedback!",
        "error"
      );
      return;
    }

    const feedbackPayload = {
      campId: camp.campId,
      campName: camp.campName,
      participantName: camp.participantName,
      participantEmail: camp.participantEmail,
      rating: parseInt(rating),
      feedback,
      date: new Date(),
    };

    try {
      const res = await axiosSecure.post("/feedback", feedbackPayload);
      if (res.data.insertedId) {
        Swal.fire("Thank You!", "Your feedback has been submitted.", "success");
        navigate(-1);
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      Swal.fire(
        "Error!",
        "Unable to submit feedback. Try again later.",
        "error"
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Provide Feedback for {camp.campName}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="rating"
              className="block text-sm font-medium text-gray-700"
            >
              Rating (1-5)
            </label>
            <input
              type="number"
              id="rating"
              className="mt-1 p-2 w-full border rounded-md"
              min="1"
              max="5"
              value={feedbackData.rating}
              onChange={(e) =>
                setFeedbackData({ ...feedbackData, rating: e.target.value })
              }
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="feedback"
              className="block text-sm font-medium text-gray-700"
            >
              Feedback
            </label>
            <textarea
              id="feedback"
              rows="4"
              className="mt-1 p-2 w-full border rounded-md"
              value={feedbackData.feedback}
              onChange={(e) =>
                setFeedbackData({ ...feedbackData, feedback: e.target.value })
              }
              required
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-4 py-2 bg-gray-500 text-white rounded-md mr-2 hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedbackModal;
