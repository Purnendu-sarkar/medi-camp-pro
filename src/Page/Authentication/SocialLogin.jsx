import React from "react";
import useAuth from "../../hooks/useAuth";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const SocialLogin = () => {
  const { googleSignIn } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        console.log(result.user);
        const userInfo = {
          email: result.user?.email,
          name: result.user?.displayName,
          role: "user",
        };
        axiosPublic.post("/users", userInfo).then((res) => {
          console.log(res.data);
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
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: error.message,
          confirmButtonText: "Try Again",
        });
      });
  };
  return (
    <div className="flex flex-col md:items-center">
      <button
        onClick={handleGoogleSignIn}
        className="btn btn-primary text-center text-white px-4 py-2 rounded-lg shadow-lg hover:shadow-xl focus:outline-none"
      >
        <FaGoogle className="mr-2"></FaGoogle>
        Sign in with Google
      </button>
    </div>
  );
};

export default SocialLogin;
