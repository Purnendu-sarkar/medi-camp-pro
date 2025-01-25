import React from "react";
import CampCard from "../Shared/CampCard";
import useCamps from "../../hooks/useCamps";
import Feedback from "./Feedback";
import Banner from "./Banner";
import { NavLink } from "react-router-dom";

const Home = () => {
  const [camps, loading, refetch] = useCamps();
  const popularCamps = camps
    .sort((a, b) => b.participantCount - a.participantCount)
    .slice(0, 6);
  return (
    <div className="">
      <Banner></Banner>
      <div className="max-w-7xl mx-auto px-4 py-8 p-6">
        <h1 className="text-2xl font-bold text-center mb-10">
          Popular Medical Camps
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularCamps.map((camp) => (
            <CampCard key={camp._id} camp={camp} />
          ))}
        </div>
        <div className="w-full text-center">
          <NavLink
            to={"/available-camps"}
            className={
              "text-center mt-4 btn bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600"
            }
          >
            <button>Available Camps</button>
          </NavLink>
        </div>
      </div>

      <Feedback></Feedback>
    </div>
  );
};

export default Home;
