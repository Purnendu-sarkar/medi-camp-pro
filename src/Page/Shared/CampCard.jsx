import React from "react";
import moment from "moment";
import {
  Calendar,
  Clock,
  MapPin,
  User,
  DollarSign,
  UsersRound,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const CampCard = ({ camp }) => {
  return (
    <div className="bg-gradient-to-r from-red-50 via-orange-50 to-violet-50 rounded-lg shadow-lg overflow-hidden border border-gray-300 flex flex-col transform transition-transform duration-300 hover:scale-105 hover:shadow-orange-200">
      {/* Image Section */}
      <div className="relative">
        <img
          className="w-full h-56 object-cover transition-transform duration-300 hover:scale-105"
          src={camp?.image}
          alt={camp?.campName}
        />
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-3">
          <h2 className="text-lg font-bold truncate">{camp?.campName}</h2>
          <p className="flex items-center gap-1 text-sm">
            <MapPin className="w-4 h-4" /> {camp?.location}
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex-grow">
        {/* Date and Time */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Date:</p>
              <p className="text-lg font-bold text-gray-800">
                {moment(camp?.date).format("DD/MM/YYYY")}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Time:</p>
              <p className="text-lg font-bold text-gray-800">
                {moment(camp?.date).format("hh:mm A")}
              </p>
            </div>
          </div>
        </div>

        {/* Healthcare Professional */}
        <p className="flex items-center gap-2 mb-2">
          <User className="w-5 h-5 text-gray-500" />
          <span>
            <strong className="text-gray-600">Healthcare Professional:</strong>{" "}
            {camp?.healthcareProfessional}
          </span>
        </p>

        {/* Participant Count */}
        <p className="flex items-center gap-2 mb-2">
          <UsersRound className="w-5 h-5 text-gray-500" />
          <span>
            <strong className="text-gray-600">Participant Count:</strong>{" "}
            {camp?.participantCount}
          </span>
        </p>

        {/* Fees */}
        <p className="flex items-center gap-2 mb-4">
          <DollarSign className="w-5 h-5 text-gray-500" />
          <span>
            <strong className="text-gray-600">Fees:</strong>{" "}
            {camp?.fees ? `$ ${camp.fees}` : "Free"}
          </span>
        </p>

        {/* Description */}
        <p
          className="text-sm text-gray-500 mb-6 line-clamp-3"
          style={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            WebkitLineClamp: 3,
          }}
        >
          {camp?.description}
        </p>
      </div>

      {/* Join Button */}

      <div className="mt-auto p-5">
        <NavLink to={`/camp-details/${camp._id}`}>
          <button className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition">
            Details
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default CampCard;
