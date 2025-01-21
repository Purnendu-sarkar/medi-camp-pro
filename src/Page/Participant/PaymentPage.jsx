import React from "react";
import { useLocation } from "react-router-dom";

const PaymentPage = () => {
  const location = useLocation();
  const { camp } = location.state || {};

  if (!camp) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-200">
        <h1 className="text-4xl font-bold text-red-500 mb-4">
          No Camp Details Found!
        </h1>
        <p className="text-gray-600">
          Please go back and select a camp to proceed with the payment.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 p-6">
      <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-extrabold text-center mb-4 text-blue-700">
          Payment for Camp
        </h1>
        <div className="flex flex-col items-center gap-4 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            {camp.campName}
          </h2>
          <p className="text-lg font-medium text-gray-600">
            Fees:{" "}
            <span className="text-blue-500 font-bold">
              ${camp.fees || "Free"}
            </span>
          </p>
        </div>
        <button className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-semibold text-lg hover:bg-blue-700 transition duration-200">
          Proceed to Payment
        </button>
      </div>
      <div className="mt-6">
        <button
          className="text-blue-600 underline hover:text-blue-800 transition"
          onClick={() => window.history.back()}
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
