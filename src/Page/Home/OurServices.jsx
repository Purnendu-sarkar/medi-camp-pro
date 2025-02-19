import React from "react";
import {
  FaUserMd,
  FaHeartbeat,
  FaSyringe,
  FaNotesMedical,
} from "react-icons/fa";

const OurServices = () => {
  return (
    <>
      <div className="w-full md:w-11/12 mx-auto bg-gray-100 py-16 px-4 sm:px-6 lg:px-8 pt-8">
        <div className="w-full mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 text-center mb-10">
            Our Healthcare Services
          </h1>
          <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12">
            MediCamp provides a wide range of essential healthcare services to
            ensure the best medical support for all participants.
          </p>

          {/* Service List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Service 1 */}
            <div className="bg-white shadow-lg rounded-xl p-6 text-center">
              <FaUserMd className="text-5xl text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">General Checkups</h3>
              <p className="text-gray-600">
                Get routine health checkups by professional doctors.
              </p>
            </div>

            {/* Service 2 */}
            <div className="bg-white shadow-lg rounded-xl p-6 text-center">
              <FaHeartbeat className="text-5xl text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Heart Care</h3>
              <p className="text-gray-600">
                Expert cardiac evaluations to monitor your heart health.
              </p>
            </div>

            {/* Service 3 */}
            <div className="bg-white shadow-lg rounded-xl p-6 text-center">
              <FaSyringe className="text-5xl text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Vaccinations</h3>
              <p className="text-gray-600">
                Get vaccinated for flu, COVID-19, and other diseases.
              </p>
            </div>

            {/* Service 4 */}
            <div className="bg-white shadow-lg rounded-xl p-6 text-center">
              <FaNotesMedical className="text-5xl text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Medical Counseling</h3>
              <p className="text-gray-600">
                Receive professional counseling for a healthier lifestyle.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OurServices;
