import React, { useState } from "react";
import useCamps from "../../hooks/useCamps";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import moment from "moment";
import SearchBar from "../Shared/SearchBar";
import Pagination from "../Shared/Pagination";

const ManageCamps = () => {
  const [camps, loading, refetch] = useCamps();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const axiosSecure = useAxiosSecure();

  const filteredCamps = camps.filter(
    (camp) =>
      camp.campName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (camp.location &&
        camp.location.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (camp.healthcareProfessional &&
        camp.healthcareProfessional
          .toLowerCase()
          .includes(searchQuery.toLowerCase()))
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredCamps.length / rowsPerPage);
  const currentData = filteredCamps.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleDelete = (camp) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/camps/${camp._id}`);
        if (res.data.deletedCount > 0) {
          refetch();
          Swal.fire({
            icon: "success",
            title: `${camp?.campName} has been deleted`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    });
  };

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
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">
        Manage Camps
      </h1>
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        placeholder="Search by any field..."
      ></SearchBar>
      {camps.length === 0 ? (
        <p className="text-center text-gray-500 mt-4">No camps found.</p>
      ) : (
        <div className="overflow-x-auto shadow-md rounded-lg mt-4">
          <table className="table-auto w-full text-sm text-left border-collapse border border-gray-300">
            <thead>
              <tr className="bg-indigo-600 text-white">
                <th className="px-4 py-2 border">#</th>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Date & Time</th>
                <th className="px-4 py-2 border">Location</th>
                <th className="px-4 py-2 border">Healthcare Professional</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((camp, index) => (
                <tr
                  key={camp._id}
                  className={
                    index % 2 === 0
                      ? "bg-gray-100"
                      : "bg-white hover:bg-gray-50"
                  }
                >
                  <td className="px-4 py-2 border text-center">
                    {(currentPage - 1) * rowsPerPage + index + 1}
                  </td>
                  <td className="px-4 py-2 border">{camp?.campName}</td>
                  <td className="px-4 py-2 border">
                    {moment(camp?.date).format("DD/MM/YYYY HH:mm")}
                  </td>
                  <td className="px-4 py-2 border">{camp?.location}</td>
                  <td className="px-4 py-2 border">
                    {camp?.healthcareProfessional}
                  </td>
                  <td className="px-4 py-2 border text-center lg:space-x-2 sm:space-y-2">
                    <Link to={`/dashboard/updateCamp/${camp._id}`}>
                      <button className="px-3 py-1 text-sm font-semibold text-white bg-blue-500 rounded hover:bg-blue-600">
                        <FaEdit />
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(camp)}
                      className="px-3 py-1 text-sm font-semibold text-white bg-red-500 rounded hover:bg-red-600"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          ></Pagination>
        </div>
      )}
    </div>
  );
};

export default ManageCamps;
