import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const UpdateProfile = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const location = useLocation();
  const profileData = location.state?.profileData;

  const [formData, setFormData] = useState({
    name: profileData?.name || "",
    email: profileData?.email || "",
    phoneNumber: profileData?.phoneNumber || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosSecure.put(
        `/users/${formData.email}`,
        formData
      );
      if (response.data.modifiedCount > 0) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Profile updated successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/dashboard/userHome");
      } else {
        Swal.fire({
          icon: "info",
          title: "No changes made",
          text: "Your profile has not been updated.",
        });
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to update profile",
        text: "Please try again later.",
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md"
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Update Profile
        </h1>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled
            className="mt-1 block w-full bg-gray-200 rounded-md border-gray-300 shadow-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 shadow-md w-full"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
