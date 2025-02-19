import React from "react";
import CampCard from "../Shared/CampCard";
import useCamps from "../../hooks/useCamps";
import Feedback from "./Feedback";
import Banner from "./Banner";
import { NavLink } from "react-router-dom";
import UpcomingCamps from "./UpcomingCamps";
import { Helmet } from "react-helmet-async";
import Newsletter from "./Newsletter";
import AboutUs from "./AboutUs";
import MeetOurDoctors from "./MeetOurDoctors";
import OurServices from "./OurServices";
import SuccessStories from "./SuccessStories";

const Home = () => {
  const [camps, loading] = useCamps();
  const popularCamps = camps
    .sort((a, b) => b.participantCount - a.participantCount)
    .slice(0, 6);

  return (
    <>
      <Helmet>
        <title>MediCamp | Home</title>
      </Helmet>
      <div>
        {/* Banner Section */}
        <Banner></Banner>

        {/* Popular Medical Camps Section */}
        <div className="w-full md:w-11/12 mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-12">
            Popular Medical Camps
          </h1>
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="loader border-t-4 border-blue-500 w-16 h-16 rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {popularCamps.map((camp) => (
                <CampCard key={camp._id} camp={camp}></CampCard>
              ))}
            </div>
          )}
          <div className="w-full text-center mt-10">
            <NavLink
              to="/available-camps"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-lg px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg focus:ring-4 focus:ring-blue-300"
            >
              Available Camps
            </NavLink>
          </div>
        </div>

        {/* Meet Our Doctors Section */}
        <div className="pt-8">
          <MeetOurDoctors></MeetOurDoctors>
        </div>

        {/* Our Services Section */}
        <div className="pt-8">
          <OurServices></OurServices>
        </div>

        {/* Feedback Section */}
        <div className="pt-8">
          <Feedback></Feedback>
        </div>

        {/* Upcoming Camps Section */}
        <div className="pt-8">
          <UpcomingCamps></UpcomingCamps>
        </div>

        {/* Success Stories Section */}
        <div className="pt-8">
          <SuccessStories></SuccessStories>
        </div>

        {/* About Us Section */}
        <div className="pt-8">
          <AboutUs></AboutUs>
        </div>

        {/* Newsletter Section */}
        <div className="pt-8">
          <Newsletter></Newsletter>
        </div>
      </div>
    </>
  );
};

export default Home;
