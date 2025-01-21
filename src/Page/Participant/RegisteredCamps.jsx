import React from "react";
import useRegisteredCamps from "../../hooks/useRegisteredCamps";

const RegisteredCamps = () => {
  const [registeredCamps, isLoading] = useRegisteredCamps();

  const handleCancel = async (campId) => {
    console.log(campId);
  };

  const handleFeedback = (campName) => {
    console.log(campName);
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
                      <span className="px-2 py-1 text-red-600 bg-red-100 rounded-full">
                        Unpaid
                      </span>
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
                      className="px-3 py-1 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition"
                      onClick={() => handleCancel(camp._id)}
                    >
                      Cancel
                    </button>
                  </td>
                  <td className="p-4 text-center">
                    <button
                      className="px-3 py-1 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition"
                      onClick={() => handleFeedback(camp.campName)}
                    >
                      Feedback
                    </button>
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
