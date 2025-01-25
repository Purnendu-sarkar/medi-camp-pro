import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const SocialLogin = () => {
  const { googleSignIn } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        const userInfo = {
          name: result.user?.displayName,
          email: result.user?.email,
          img: result.user?.photoURL,
          phoneNumber: result.user?.phoneNumber || "Not Provided",
          role: "user",
        };

        axiosPublic.post("/users", userInfo).then(() => {
          Swal.fire({
            icon: "success",
            title: "Login Successful",
            text: "Welcome back, " + result.user?.displayName + "!",
            showConfirmButton: false,
            timer: 1500,
          });

          navigate("/");
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: error.message,
          confirmButtonText: "Try Again",
        });
      });
  };

  return (
    <div className="flex flex-col items-center mt-6">
      <button
        onClick={handleGoogleSignIn}
        className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 text-white font-medium text-lg rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-cyan-300"
      >
        <div className="flex items-center justify-center bg-white rounded-full p-2">
          {/* Google logo with colored parts */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            className="h-6 w-6"
          >
            <path
              fill="#EA4335"
              d="M24 9.5c3.14 0 5.66 1.07 7.77 2.82l5.8-5.8C33.42 3.02 28.92 1 24 1 14.8 1 7.24 6.83 4.36 14.54l6.94 5.39C13.2 11.17 18.21 9.5 24 9.5z"
            />
            <path
              fill="#34A853"
              d="M24 43c4.38 0 8.19-1.43 11.16-3.89l-6.67-5.15c-1.4.94-3.21 1.54-4.49 1.54-5.48 0-10.09-3.82-11.61-8.94L4.36 33.46C7.24 41.17 14.8 47 24 47z"
            />
            <path
              fill="#4A90E2"
              d="M43.54 24.54c0-1.39-.15-2.73-.44-4.02H24v7.55h11.04c-.47 2.36-1.79 4.38-3.64 5.77l6.67 5.15C42.51 34.92 43.54 29.92 43.54 24.54z"
            />
            <path
              fill="#FBBC05"
              d="M12.15 25.89c-.35-1.03-.55-2.13-.55-3.29s.2-2.26.55-3.29L4.36 14.54C2.85 17.35 2 20.58 2 24s.85 6.65 2.36 9.46l7.79-6.58z"
            />
          </svg>
        </div>
        <span>Sign in with Google</span>
      </button>

      <p className="text-sm text-gray-500 mt-4">
        By signing in, you agree to our{" "}
        <a href="/" className="text-blue-500 underline hover:text-blue-600">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="/" className="text-blue-500 underline hover:text-blue-600">
          Privacy Policy
        </a>
        .
      </p>
    </div>
  );
};

export default SocialLogin;
