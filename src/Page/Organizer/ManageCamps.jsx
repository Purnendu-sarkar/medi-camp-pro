import React from "react";
import useCamps from "../../hooks/useCamps";
import { FaEdit, FaTrash } from "react-icons/fa";

const ManageCamps = () => {
  const [camps, loading, refetch] = useCamps();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white">
        <div className="flex items-center justify-center space-x-4 animate-bounce">
          <div className="w-5 h-5 bg-white rounded-full"></div>
          <div className="w-5 h-5 bg-white rounded-full"></div>
          <div className="w-5 h-5 bg-white rounded-full"></div>
        </div>
        <h1 className="mt-4 text-xl font-bold">Fetching Camps...</h1>
        <p className="text-sm opacity-80">
          Hang tight! Your camps are on the way 🚀
        </p>
      </div>
    );
  }

  return (
    <div className="px-4 lg:px-8 py-6">
      <h1 className="text-2xl font-bold text-center mb-6">Manage Camps</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300 text-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2">#</th>
              <th className="border border-gray-300 p-2">Name</th>
              <th className="border border-gray-300 p-2">Date & Time</th>
              <th className="border border-gray-300 p-2">Location</th>
              <th className="border border-gray-300 p-2">
                Healthcare Professional
              </th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {camps.map((camp, index) => (
              <tr key={camp._id} className="hover:bg-gray-50">
                <td className="border border-gray-300 p-2 text-center">
                  {index + 1}
                </td>
                <td className="border border-gray-300 p-2">{camp?.campName}</td>
                <td className="border border-gray-300 p-2">{camp?.date}</td>
                <td className="border border-gray-300 p-2">{camp?.location}</td>
                <td className="border border-gray-300 p-2">
                  {camp?.healthcareProfessional}
                </td>
                <td className="border border-gray-300 p-2 w-10 mx-auto justify-center space-x-4">
                  <button className="text-blue-500 hover:text-blue-700">
                    <FaEdit className="w-full  h-full" />
                  </button>
                  <button className="text-red-500 hover:text-red-700">
                    <FaTrash className="w-full h-full" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageCamps;
