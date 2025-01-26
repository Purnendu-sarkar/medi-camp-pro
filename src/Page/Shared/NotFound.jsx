import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound = () => {
  return (
    <motion.div
      className="h-screen flex flex-col justify-center items-center text-center bg-gradient-to-r from-purple-500 to-indigo-600 text-white"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h1
        className="text-9xl font-extrabold"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        404
      </motion.h1>
      <motion.p
        className="text-2xl mt-4"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        Oops! The page you're looking for doesn't exist.
      </motion.p>
      <motion.div
        className="mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <Link
          to="/"
          className="bg-white text-purple-700 px-6 py-3 text-lg font-semibold rounded-full shadow-lg hover:bg-purple-100 transition-all duration-300"
        >
          Go Back to Home
        </Link>
      </motion.div>
      <motion.div
        className="mt-12"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 0.6,
          delay: 0.8,
          type: "spring",
          stiffness: 100,
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-12 h-12 text-white animate-bounce"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v18m9-9H3"
          />
        </svg>
      </motion.div>
    </motion.div>
  );
};

export default NotFound;
