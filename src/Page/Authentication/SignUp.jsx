import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import SocialLogin from "./SocialLogin";
import { Player } from "@lottiefiles/react-lottie-player";
import signupLottie from "../../assets/lottie/signup.json";

const SignUp = () => {
  const { createUser, updateUserProfile } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const result = await createUser(data.email, data.password);
      updateUserProfile(data.name, data.photoURL).then(() => {
        const userInfo = {
          name: data.name,
          email: data.email,
          img: data.photoURL,
          phoneNumber: data.phoneNumber,
          role: "admin",
        };
        axiosPublic.post("/users", userInfo).then((res) => {
          if (res.data.insertedId) {
            reset();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "User created successfully.",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate("/");
          }
        });
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Sign Up Failed",
        text: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hero min-h-screen bg-gradient-to-r from-pink-100 via-purple-100 to-indigo-100">
      <div className="hero-content flex-col lg:flex-row-reverse items-center gap-8">
        {/* Lottie Animation Section */}
        <div className="lg:w-1/2 text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
            Create Your Account!
          </h1>
          <p className="mt-4 text-gray-600">
            Join us and explore the world of possibilities.
          </p>
          <Player autoplay loop src={signupLottie} className="w-full mx-auto" />
        </div>

        {/* SignUp Form Section */}
        <div className="card w-full max-w-lg shadow-lg bg-white rounded-lg p-8">
          <h2 className="text-2xl font-bold text-center text-gray-700">
            Sign Up Now
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
            {/* Name Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray-600">Full Name</span>
              </label>
              <input
                type="text"
                {...register("name", { required: true })}
                placeholder="Your full name"
                className="input input-bordered w-full focus:ring-2 focus:ring-purple-500"
              />
              {errors.name && (
                <span className="text-sm text-red-500">
                  Please provide your name
                </span>
              )}
            </div>

            {/* Phone Number Field */}
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text text-gray-600">Phone Number</span>
              </label>
              <input
                type="number"
                {...register("phoneNumber", {
                  required: true,
                  pattern: /^[0-9]{10,15}$/,
                })}
                placeholder="Your phone number"
                className="input input-bordered w-full focus:ring-2 focus:ring-purple-500"
              />
              {errors.phoneNumber && (
                <span className="text-sm text-red-500">
                  Enter a valid phone number (10-15 digits)
                </span>
              )}
            </div>

            {/* Photo URL Field */}
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text text-gray-600">Photo URL</span>
              </label>
              <input
                type="text"
                {...register("photoURL", { required: true })}
                placeholder="Link to your profile picture"
                className="input input-bordered w-full focus:ring-2 focus:ring-purple-500"
              />
              {errors.photoURL && (
                <span className="text-sm text-red-500">
                  Photo URL is required
                </span>
              )}
            </div>

            {/* Email Field */}
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text text-gray-600">Email</span>
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                placeholder="Your email address"
                className="input input-bordered w-full focus:ring-2 focus:ring-purple-500"
              />
              {errors.email && (
                <span className="text-sm text-red-500">Email is required</span>
              )}
            </div>

            {/* Password Field */}
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text text-gray-600">Password</span>
              </label>
              <input
                type="password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  maxLength: 20,
                  pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                })}
                placeholder="Create a password"
                className="input input-bordered w-full focus:ring-2 focus:ring-purple-500"
              />
              {errors.password && (
                <span className="text-sm text-red-500">
                  Password must include uppercase, lowercase, number, and a
                  special character (6-20 characters).
                </span>
              )}
            </div>

            {/* Submit Button */}
            <div className="form-control mt-6">
              <button
                className={`btn btn-primary w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-indigo-600 hover:to-purple-600 text-white ${
                  loading ? "loading" : ""
                }`}
                disabled={loading}
              >
                {loading ? "Creating Account..." : "Sign Up"}
              </button>
            </div>
          </form>

          {/* Login Redirect */}
          <p className="text-center mt-4 text-gray-600">
            Already have an account?{" "}
            <Link to="/join-us" className="text-purple-500 font-medium">
              Log In
            </Link>
          </p>
          <div className="divider">OR</div>

          {/* Social Login */}
          <SocialLogin />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
