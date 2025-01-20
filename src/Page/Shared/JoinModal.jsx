import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const JoinModal = ({ camp, onClose }) => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const participantData = {
      campName: camp.campName,
      fees: camp.fees,
      location: camp.location,
      healthcareProfessional: camp.healthcareProfessional,
      participantName: user?.displayName,
      participantEmail: user?.email,
      ...data,
    };

    try {
      const response = await axiosPublic.post(
        `/participants`,
        participantData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        }
      );

      if (response.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Registration Successful",
          text: "Participant added to the camp!",
        });
        onClose();
      }
    } catch (error) {
      console.error("Registration failed:", error);
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: "Please try again.",
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 md:p-8 relative mx-4 space-y-6">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-2xl"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Join {camp.campName}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Participant Info Section */}
          <div className="space-y-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Participant Name
              </label>
              <input
                type="text"
                value={user?.displayName || ""}
                readOnly
                className="w-full mt-1 bg-gray-100 border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Participant Email
              </label>
              <input
                type="email"
                value={user?.email || ""}
                readOnly
                className="w-full mt-1 bg-gray-100 border-gray-300 rounded-md p-2"
              />
            </div>
          </div>

          {/* Camp Info Section */}
          <div className="space-y-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Camp Name
              </label>
              <input
                type="text"
                value={camp.campName}
                readOnly
                className="w-full mt-1 bg-gray-100 border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Camp Fees
              </label>
              <input
                type="text"
                value={camp.fees ? `$${camp.fees}` : "Free"}
                readOnly
                className="w-full mt-1 bg-gray-100 border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                type="text"
                value={camp.location}
                readOnly
                className="w-full mt-1 bg-gray-100 border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Healthcare Professional
              </label>
              <input
                type="text"
                value={camp.healthcareProfessional}
                readOnly
                className="w-full mt-1 bg-gray-100 border-gray-300 rounded-md p-2"
              />
            </div>
          </div>

          {/* Input Fields with Validation */}
          <div className="space-y-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Age
              </label>
              <input
                type="number"
                placeholder="Enter your age"
                {...register("age", { required: "Age is required", min: 1 })}
                className="w-full mt-1 border-gray-300 rounded-md p-2"
              />
              {errors.age && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.age.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="Enter your phone number"
                {...register("phoneNumber", {
                  required: "Phone number is required",
                })}
                className="w-full mt-1 border-gray-300 rounded-md p-2"
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Gender
              </label>
              <select
                {...register("gender", { required: "Gender is required" })}
                className="w-full mt-1 border-gray-300 rounded-md p-2"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {errors.gender && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.gender.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Emergency Contact
              </label>
              <input
                type="tel"
                placeholder="Enter your emergency contact number"
                {...register("emergencyContact", {
                  required: "Emergency contact is required",
                })}
                className="w-full mt-1 border-gray-300 rounded-md p-2"
              />
              {errors.emergencyContact && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.emergencyContact.message}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 hover:scale-105 transition-transform"
          >
            Confirm Join
          </button>
        </form>
      </div>
    </div>
  );
};

export default JoinModal;
