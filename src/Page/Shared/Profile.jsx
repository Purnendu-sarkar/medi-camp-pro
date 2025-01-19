import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import coverImg from "../../assets/cover.jpg";
import useAdmin from "../../hooks/useAdmin";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Profile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [profileData, setProfileData] = useState(null);
  const [isAdmin] = useAdmin();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosSecure.get(`/users/${user?.email}`);
        setProfileData(res.data);
      } catch (error) {
        console.error("Failed to fetch profile data:", error);
      }
    };

    if (user?.email) {
      fetchProfile();
    }
  }, [user, axiosSecure]);

  if (!profileData) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
        <div className="text-center">
          {/* Animated Loader */}
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white mx-auto"></div>
          {/* Loading Text */}
          <h1 className="mt-4 text-white text-xl md:text-2xl font-bold">
            Fetching your profile...
          </h1>
          {/* Fancy Tagline */}
          <p className="text-white text-sm mt-2 italic">
            Please wait a moment, your data is on the way!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-md rounded-lg w-11/12 md:w-3/4 lg:w-1/2">
        {/* Cover Image */}
        <div className="relative">
          <img
            src={coverImg}
            alt="Cover"
            className="w-full h-40 md:h-60 object-cover rounded-t-lg"
          />
          <img
            src={profileData.img || user?.photoURL}
            alt="Profile"
            className="absolute w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white shadow-md -bottom-12 left-1/2 transform -translate-x-1/2"
          />
        </div>
        {/* Profile Content */}
        <div className="text-center mt-16 px-6">
          <h1 className="text-2xl font-bold text-gray-800">
            {profileData.name || user?.displayName}
          </h1>
          <p className="text-sm text-gray-500">
            {profileData.email || user?.email}
          </p>
          <p className="mt-2 text-sm text-gray-600">
            Contact: {profileData.phoneNumber || "Not Provided"}
          </p>
          <p
            className={`mt-2 px-3 py-1 rounded-full text-white text-sm inline-block ${
              isAdmin ? "bg-green-500" : "bg-blue-500"
            }`}
          >
            {isAdmin ? "Organizer" : "Participant"}
          </p>
        </div>
        {/* Additional Details */}
        <div className="mt-8 px-6 space-y-4">
          <div className="flex justify-between bg-gray-100 p-4 rounded-lg">
            <p className="text-sm text-gray-500">
              {isAdmin ? "Admin" : "User"} ID:
            </p>
            <p className="text-gray-700 font-medium overflow-hidden">
              {user?.uid}
            </p>
          </div>
          <div className="flex justify-between bg-gray-100 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Account Status:</p>
            <p className="text-gray-700 font-medium">
              {isAdmin ? "Admin" : "User"}
            </p>
          </div>
        </div>
        {/* Buttons */}
        <div className="mt-8 mb-4 flex justify-center gap-4">
          <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 shadow-md">
            Update Profile
          </button>
          <button className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 shadow-md">
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
