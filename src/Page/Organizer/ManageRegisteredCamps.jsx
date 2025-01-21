import React from "react";
import useManageRegisteredCamps from "../../hooks/useManageRegisteredCamps";

const ManageRegisteredCamps = () => {
  const [registeredCamps, loading] = useManageRegisteredCamps();

  const handleCancel = async (registrationId) => {
    console.log(registrationId);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div
          className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold text-center mb-6">
        Manage Registered Camps
      </h2>
      {registeredCamps.length === 0 ? (
        <p className="text-center text-gray-500">No registered camps found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full text-left border-collapse border border-gray-300 shadow-md rounded-lg">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="px-4 py-2 border">Camp Name</th>
                <th className="px-4 py-2 border">Camp Fees</th>
                <th className="px-4 py-2 border">Participant Name</th>
                <th className="px-4 py-2 border">Payment Status</th>
                <th className="px-4 py-2 border">Payment Confirmation</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {registeredCamps.map((camp, index) => (
                <tr
                  key={camp._id}
                  className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                >
                  <td className="px-4 py-2 border">{camp.campName}</td>
                  <td className="px-4 py-2 border">${camp.fees}</td>
                  <td className="px-4 py-2 border">{camp.participantName}</td>
                  <td className="px-4 py-2 border">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded ${
                        camp.paymentStatus
                          ? "bg-green-200 text-green-800"
                          : "bg-red-200 text-red-800"
                      }`}
                    >
                      {camp.paymentStatus ? "Paid" : "Pending"}
                    </span>
                  </td>
                  <td className="px-4 py-2 border">
                    {camp.paymentConfirmed ? "Confirmed" : "Not Confirmed"}
                  </td>
                  <td className="px-4 py-2 border">
                    <button
                      onClick={() => handleCancel(camp._id)}
                      className="px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageRegisteredCamps;
