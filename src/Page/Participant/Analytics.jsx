import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Analytics = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

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
      <div className="flex flex-col items-center justify-center h-screen">
        <div
          className="spinner-border animate-spin inline-block w-12 h-12 border-4 border-blue-500 rounded-full"
          role="status"
        ></div>
        <p className="mt-4 text-lg text-blue-500">Loading payment history...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        <p className="text-xl font-semibold">
          Failed to load payment history. Please try again later.
        </p>
      </div>
    );
  }

  const chartData = paymentHistory.map((payment) => ({
    name: payment.campName,
    fees: payment.fees,
    date: new Date(payment.date).toLocaleDateString(),
  }));

  return (
    <div className="p-6 md:p-10 bg-gray-100 min-h-screen">
      <h2 className="text-4xl font-extrabold mb-8 text-center text-blue-600">
        Analytics Dashboard
      </h2>

      {/* Chart Section */}
      {chartData.length > 0 ? (
        <div className="shadow-lg bg-white rounded-lg p-6">
          <h3 className="text-2xl font-bold text-center mb-4 text-gray-800">
            Camp Fees Analytics
          </h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 12, fontWeight: "bold" }}
                label={{
                  value: "Camp Name",
                  position: "insideBottom",
                  dy: 10,
                  fontWeight: "bold",
                }}
              />
              <YAxis
                tick={{ fontSize: 12, fontWeight: "bold" }}
                label={{
                  value: "Fees",
                  angle: -90,
                  position: "insideLeft",
                  dy: -10,
                  fontWeight: "bold",
                }}
              />
              <Tooltip
                formatter={(value, name) => [`$${value}`, "Fees"]}
                labelFormatter={(label) =>
                  `Camp: ${label} (${
                    chartData.find((d) => d.name === label)?.date
                  })`
                }
              />
              <Legend verticalAlign="top" height={36} />
              <Bar
                dataKey="fees"
                fill="#4F46E5"
                barSize={40}
                name="Fees Paid"
                radius={[10, 10, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="text-center mt-20">
          <h3 className="text-2xl font-semibold text-gray-700">
            No payment history found.
          </h3>
          <p className="text-gray-500 mt-2">
            Make a payment to see your analytics dashboard.
          </p>
          <button
            className="mt-6 px-6 py-3 bg-blue-600 text-white text-lg font-bold rounded-lg shadow-lg hover:bg-blue-700 transition-all"
            onClick={() => window.location.reload()}
          >
            Refresh
          </button>
        </div>
      )}
    </div>
  );
};

export default Analytics;
