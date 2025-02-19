import React from "react";

const AboutUs = () => {
  return (
    <section className="w-full md:w-11/12 mx-auto bg-gray-100 py-12 px-6 md:px-12 lg:px-20">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">About Us</h2>
        <p className="text-lg text-gray-600 mb-8">
          Welcome to{" "}
          <span className="font-semibold text-blue-600">
            Medical Camp Management System (MCMS)
          </span>
          , a platform dedicated to streamlining medical camp organization and
          participation. We aim to make healthcare accessible, transparent, and
          efficient for organizers, healthcare professionals, and participants
          alike.
        </p>
      </div>
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className=" p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Our Mission
          </h3>
          <p className="text-gray-600">
            Our mission is to enhance healthcare accessibility by providing an
            intuitive platform that simplifies medical camp coordination. We
            believe in leveraging technology to create a seamless experience for
            everyone involved.
          </p>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            What We Offer
          </h3>
          <ul className="text-gray-600 list-disc pl-5">
            <li>Effortless camp management for organizers</li>
            <li>Seamless participant registration and tracking</li>
            <li>Secure and transparent payment processing</li>
            <li>Real-time analytics and insights</li>
            <li>Feedback and rating system for continuous improvement</li>
          </ul>
        </div>
        {/* <div className="bg-white shadow-lg rounded-lg p-6 md:col-span-2">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Why Choose Us?
          </h3>
          <p className="text-gray-600">
            Our user-friendly platform ensures smooth medical camp coordination
            with real-time updates, secure data handling, and an impactful
            healthcare outreach. Join us in making medical camps more accessible
            and efficient.
          </p>
        </div> */}
      </div>
    </section>
  );
};

export default AboutUs;
