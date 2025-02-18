import React, { useEffect } from "react";
import useUpcomingCamps from "../../hooks/useUpcomingCamps";
import moment from "moment";
import { NavLink } from "react-router-dom";

const UpcomingCamps = () => {
  const { upcomingCamps, fetchUpcomingCamps } = useUpcomingCamps();

  useEffect(() => {
    fetchUpcomingCamps();
  }, [fetchUpcomingCamps]);

  return (
    <div className="w-full md:w-11/12 mx-auto px-6 lg:px-12 py-16">
      <h2 className="text-4xl font-bold text-center text-green-800 mb-12 drop-shadow-lg">
        🌟 Explore Upcoming Camps 🌟
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {upcomingCamps.map((camp) => (
          <div
            key={camp._id}
            className="p-6 bg-white rounded-lg shadow-xl transition-transform transform hover:scale-105 hover:shadow-2xl"
          >
            <img
              src={camp.image}
              alt={camp.campName}
              className="rounded-lg mb-4 h-48 w-full object-cover"
            />
            <h3 className="text-lg font-bold text-gray-800 hover:text-green-700 transition-colors">
              {camp.campName}
            </h3>
            <p className="text-sm text-gray-600 mb-2">
              📍 Location: <span className="font-medium">{camp.location}</span>
            </p>
            <p className="text-sm text-gray-600 mb-2">
              👩‍⚕️ Professional:{" "}
              <span className="font-medium">{camp.healthcareProfessional}</span>
            </p>
            <p className="text-sm text-gray-600 mb-2">
              📅 Date:{" "}
              <span className="font-medium">
                {moment(camp?.date).format("DD/MM/YYYY")}
              </span>
            </p>
            <p className="text-sm text-gray-600 mb-2">
              🕒 Time:{" "}
              <span className="font-medium">
                {moment(camp?.date).format("hh:mm A")}
              </span>
            </p>
            <p className="text-sm text-gray-800 font-semibold">
              💵 Fees: ${camp.fees}
            </p>
            <NavLink to={`/camp-details/${camp._id} `}>
              <button className="mt-4 w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring focus:ring-green-300 transition-shadow">
                Learn More
              </button>
            </NavLink>
          </div>
        ))}
        {upcomingCamps.length === 0 && (
          <p className="text-center text-gray-700 mt-8 font-medium">
            No upcoming camps available at the moment. 🚫
          </p>
        )}
      </div>
    </div>
  );
};

export default UpcomingCamps;
