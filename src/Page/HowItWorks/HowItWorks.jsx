import React from "react";
import {
  FaUserCheck,
  FaHospitalUser,
  FaClipboardList,
  FaHeart,
} from "react-icons/fa";
import { Helmet } from "react-helmet-async";

const HowItWorks = () => {
  return (
    <>
      <Helmet>
        <title>MediCamp | How It Works</title>
      </Helmet>
      <div className="w-full bg-gray-100 min-h-screen py-16 px-6 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 text-center mb-10">
            How It Works
          </h1>
          <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12">
            MediCamp makes it easy to find, join, and participate in medical
            camps. Follow these simple steps to get started!
          </p>

          {/* Steps Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="bg-white shadow-lg rounded-xl p-6 text-center">
              <FaUserCheck className="text-5xl text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Step 1: Sign Up</h3>
              <p className="text-gray-600">
                Create an account easily using email or social login.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white shadow-lg rounded-xl p-6 text-center">
              <FaHospitalUser className="text-5xl text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                Step 2: Browse Camps
              </h3>
              <p className="text-gray-600">
                Explore upcoming medical camps and find the right one for you.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white shadow-lg rounded-xl p-6 text-center">
              <FaClipboardList className="text-5xl text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Step 3: Register</h3>
              <p className="text-gray-600">
                Fill in your details and join a camp with just a few clicks.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-white shadow-lg rounded-xl p-6 text-center">
              <FaHeart className="text-5xl text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                Step 4: Attend & Benefit
              </h3>
              <p className="text-gray-600">
                Participate in the camp and receive the best medical care.
              </p>
            </div>
          </div>

          {/* Additional Info Section */}
          <div className="bg-white shadow-lg rounded-xl p-10 mt-16 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Why Choose MediCamp?
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              We connect participants with experienced medical professionals in
              well-organized health camps. Get expert care and support at every
              step.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default HowItWorks;
