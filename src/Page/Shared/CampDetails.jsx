import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import {
  Calendar,
  Clock,
  MapPin,
  User,
  DollarSign,
  UsersRound,
} from "lucide-react";
import moment from "moment";
import JoinModal from "./JoinModal";

const CampDetails = () => {
  const camp = useLoaderData();
  const [isModalOpen, setModalOpen] = useState(false);

  const handleJoinCamp = () => {
    setModalOpen(true);
  };

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden border border-gray-300 my-8 p-6 ">
      <div className="relative overflow-hidden rounded-lg mb-6 group">
        <img
          src={camp.image}
          alt={camp.campName}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <h1 className="text-2xl font-bold text-gray-800 mb-4">{camp.campName}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Date and Time */}
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-gray-500" />
          <p className="text-gray-600">
            <strong>Date:</strong> {moment(camp.date).format("DD/MM/YYYY")}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-gray-500" />
          <p className="text-gray-600">
            <strong>Time:</strong> {moment(camp.date).format("HH:mm A")}
          </p>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-gray-500" />
          <p className="text-gray-600">
            <strong>Location:</strong> {camp.location}
          </p>
        </div>

        {/* Healthcare Professional */}
        <div className="flex items-center gap-2">
          <User className="w-5 h-5 text-gray-500" />
          <p className="text-gray-600">
            <strong>Healthcare Professional:</strong>{" "}
            {camp.healthcareProfessional}
          </p>
        </div>

        {/* Participant Count */}
        <div className="flex items-center gap-2">
          <UsersRound className="w-5 h-5 text-gray-500" />
          <p className="text-gray-600">
            <strong>Participant Count:</strong> {camp.participantCount}
          </p>
        </div>

        {/* Fees */}
        <div className="flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-gray-500" />
          <p className="text-gray-600">
            <strong>Fees:</strong> {camp.fees ? `$ ${camp.fees}` : "Free"}
          </p>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-700 mb-6">{camp.description}</p>

      {/* Join Button */}
      <button
        onClick={handleJoinCamp}
        className="bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600 transition"
      >
        Join Camp
      </button>

      {isModalOpen && (
        <JoinModal camp={camp} onClose={() => setModalOpen(false)}></JoinModal>
      )}
    </div>
  );
};

export default CampDetails;
