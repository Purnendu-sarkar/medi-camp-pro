import React from "react";
import useManageRegisteredCamps from "../../hooks/useManageRegisteredCamps";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManageRegisteredCamps = () => {
  const [registeredCamps, loading, refetch] = useManageRegisteredCamps();
  const axiosSecure = useAxiosSecure();

  const handleConfirmation = async (registrationId) => {
    try {
      const res = await axiosSecure.patch(`/participants/${registrationId}`, {
        confirmationStatus: true,
      });
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          icon: "success",
          title: "Confirmation Success",
          text: "Confirmation status updated successfully!",
          timer: 2000,
          showConfirmButton: false,
        });
        refetch();
      }
    } catch (error) {
      console.error("Error updating confirmation status:", error);
    }
  };

  const handleCancel = async (registrationId) => {
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
          const res = await axiosSecure.delete(
            `/participants/${registrationId}`
          );
          if (res.data.deletedCount > 0) {
            Swal.fire(
              "Cancelled!",
              "The registration has been cancelled.",
              "success"
            );
            refetch();
          } else {
            Swal.fire("Error!", "Unable to cancel the registration.", "error");
          }
        } catch (error) {
          console.error("Error cancelling registration:", error);
          Swal.fire("Error!", "Something went wrong. Try again.", "error");
        }
      }
    });
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
                      {camp.paymentStatus ? "Paid" : "Unpaid"}
                    </span>
                  </td>
                  <td className="px-4 py-2 border">
                    <button
                      onClick={() => handleConfirmation(camp._id)}
                      className={`px-4 py-1 text-xs font-semibold rounded ${
                        camp.paymentConfirmation
                          ? "bg-green-200 text-green-800 cursor-not-allowed"
                          : camp.paymentStatus
                          ? "bg-yellow-200 text-yellow-800 hover:bg-yellow-300"
                          : "bg-gray-200 text-gray-800 cursor-not-allowed"
                      }`}
                      disabled={camp.paymentConfirmation || !camp.paymentStatus}
                    >
                      {camp.paymentConfirmation
                        ? "Confirmed"
                        : camp.paymentStatus
                        ? "Pending"
                        : "Not Confirmed"}
                    </button>
                  </td>

                  <td className="px-4 py-2 border">
                    <button
                      onClick={() => handleCancel(camp._id)}
                      className={`px-4 py-2 text-white ${
                        camp.paymentStatus || camp.paymentConfirmation
                          ? "bg-gray-300 cursor-not-allowed"
                          : "bg-red-500 hover:bg-red-600"
                      } rounded`}
                      disabled={camp.paymentStatus || camp.paymentConfirmation}
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
