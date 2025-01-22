import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch payment history using react-query
  const {
    data: paymentHistory = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["payment-history", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payment-history/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div
          className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
          role="status"
        ></div>
        <p className="ml-2 text-lg">Loading payment history...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        <p>Failed to load payment history. Please try again later.</p>
      </div>
    );
  }

  // Sort payment history by date in descending order
  const sortedPaymentHistory = [...paymentHistory].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <div className="p-6">
      <h2 className="text-3xl font-extrabold mb-6 text-center text-blue-600">
        Payment History
      </h2>
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="table-auto w-full border-collapse border border-gray-200 bg-white">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="border border-gray-200 p-3 text-left">
                Camp Name
              </th>
              <th className="border border-gray-200 p-3 text-left">Fees</th>
              <th className="border border-gray-200 p-3 text-left">
                Payment Status
              </th>
              <th className="border border-gray-200 p-3 text-left">
                Payment Confirmation
              </th>
              <th className="border border-gray-200 p-3 text-left">
                Transaction ID
              </th>
              <th className="border border-gray-200 p-3 text-left">Date</th>
              <th className="border border-gray-200 p-3 text-left">Time</th>
            </tr>
          </thead>
          <tbody>
            {sortedPaymentHistory.map((payment, index) => {
              const paymentDate = new Date(payment.date);
              return (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-gray-100`}
                >
                  <td className="border border-gray-200 p-3">
                    {payment.campName}
                  </td>
                  <td className="border border-gray-200 p-3">
                    ${payment.fees.toFixed(2)}
                  </td>
                  <td className="border border-gray-200 p-3 capitalize">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        payment?.paymentStatus === "paid"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {payment?.paymentStatus}
                    </span>
                  </td>
                  <td className="border border-gray-200 p-3">
                    {payment.paymentConfirmation ? (
                      <span className="px-3 py-1 text-xs font-semibold bg-green-100 text-green-600 rounded-full">
                        Confirmed
                      </span>
                    ) : (
                      <span className="px-3 py-1 text-xs font-semibold bg-yellow-100 text-yellow-600 rounded-full">
                        Pending
                      </span>
                    )}
                  </td>
                  <td className="border border-gray-200 p-3">
                    {payment.transactionId || "N/A"}
                  </td>
                  <td className="border border-gray-200 p-3">
                    {paymentDate.toLocaleDateString()}{" "}
                  </td>
                  <td className="border border-gray-200 p-3">
                    {paymentDate.toLocaleTimeString()}{" "}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
