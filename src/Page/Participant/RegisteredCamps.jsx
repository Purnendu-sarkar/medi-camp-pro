import React from "react";
import useRegisteredCamps from "../../hooks/useRegisteredCamps";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const RegisteredCamps = () => {
  const [registeredCamps, isLoading, refetch] = useRegisteredCamps();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const handlePayment = (camp) => {
    navigate(`/dashboard/payment/${camp._id}`, { state: { camp } });
  };

  // Handle camp cancellation
  const handleCancel = async (campId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/participants/${campId}`);
          if (res.data.deletedCount > 0) {
            Swal.fire(
              "Cancelled!",
              "Your registration has been successfully cancelled.",
              "success"
            );
            refetch();
          } else {
            Swal.fire("Error!", "Unable to cancel registration.", "error");
          }
        } catch (error) {
          console.error("Error cancelling registration:", error);
          Swal.fire("Error!", "Something went wrong. Try again.", "error");
        }
      }
    });
  };

  // Handle camp feedback
  const handleFeedback = (camp) => {
    navigate("/dashboard/feedback", { state: { camp } });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-lg font-semibold text-gray-600 animate-pulse">
          Loading registered camps...
        </p>
      </div>
    );
  }

  return (
    <div className="px-4 lg:px-8 py-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-700">
        Registered Camps
      </h1>
      <div className="overflow-x-auto shadow-lg rounded-lg bg-white">
        {registeredCamps.length === 0 ? (
          <div className="flex flex-col justify-center items-center h-screen">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">
              No Registered Camps Found
            </h2>
            <p className="text-gray-500 text-center">
              It seems you haven't registered for any camps yet. Explore our
              camps and get started!
            </p>
          </div>
        ) : (
          <table className="table-auto w-full text-left border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                <th className="p-4 text-center">#</th>
                <th className="p-4">Camp Name</th>
                <th className="p-4">Camp Fees</th>
                <th className="p-4">Participant Name</th>
                <th className="p-4">Payment Status</th>
                <th className="p-4">Payment Confirmation</th>
                <th className="p-4 text-center">Cancel</th>
                <th className="p-4 text-center">Feedback</th>
              </tr>
            </thead>
            <tbody>
              {registeredCamps.map((camp, index) => (
                <tr
                  key={camp._id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  } hover:bg-gray-50 transition`}
                >
                  <td className="p-4 text-center text-gray-700">{index + 1}</td>
                  <td className="p-4 text-gray-700">{camp.campName}</td>
                  <td className="p-4 text-gray-700">
                    {camp.fees ? `$${camp.fees}` : "Free"}
                  </td>
                  <td className="p-4 text-gray-700">{camp.participantName}</td>
                  <td className="p-4 text-gray-700">
                    {camp.paymentStatus ? (
                      <span className="px-2 py-1 text-green-600 bg-green-100 rounded-full">
                        Paid
                      </span>
                    ) : (
                      <button
                        className="px-3 py-1 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-300 transition"
                        onClick={() => handlePayment(camp)}
                      >
                        Pay
                      </button>
                    )}
                  </td>
                  <td className="p-4 text-gray-700">
                    {camp.paymentConfirmation ? (
                      <span className="px-2 py-1 text-green-600 bg-green-100 rounded-full">
                        Confirmed
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-yellow-600 bg-yellow-100 rounded-full">
                        Pending
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() => handleCancel(camp._id)}
                      className={`px-4 py-2 text-white rounded ${
                        camp.paymentStatus || camp.paymentConfirmation
                          ? "bg-gray-300 cursor-not-allowed"
                          : "bg-red-500 hover:bg-red-600"
                      }`}
                      disabled={camp.paymentStatus || camp.paymentConfirmation}
                    >
                      Cancel
                    </button>
                  </td>
                  <td className="p-4 text-center">
                    {camp.paymentConfirmation ? (
                      <button
                        className="px-3 py-1 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition"
                        onClick={() => handleFeedback(camp)}
                      >
                        Feedback
                      </button>
                    ) : (
                      <span className="px-2 py-1 text-gray-400">Wait!....</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default RegisteredCamps;
