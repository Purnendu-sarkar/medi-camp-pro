import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import SocialLogin from "./SocialLogin";
import { Player } from "@lottiefiles/react-lottie-player";
import loginLottie from "../../assets/lottie/login.json";
import { Helmet } from "react-helmet-async";

const LogIn = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      const result = await signIn(email, password);
      const user = result.user;
      Swal.fire({
        title: `User Login Successful`,
        icon: "success",
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
      navigate(from, { replace: true });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.message,
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>MediCamp | Join Us</title>
      </Helmet>
      <div className="hero min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-50">
        <div className="hero-content flex-col lg:flex-row-reverse items-center gap-10">
          {/* Animation Section */}
          <div className="text-center lg:text-left lg:w-1/2">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
              Welcome Back!
            </h1>
            <p className="py-4 text-gray-600">
              Log in to continue exploring our platform.
            </p>
            <Player
              autoplay
              loop
              src={loginLottie}
              className="max-w-full mx-auto"
              style={{ blockSize: "350px", inlineSize: "350px" }}
            />
          </div>

          {/* Login Form Section */}
          <div className="card flex-shrink-0 w-full max-w-md shadow-lg bg-white rounded-lg p-8">
            <h2 className="text-2xl font-bold text-center text-gray-700">
              Login to Your Account
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
              {/* Email Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-gray-600">Email</span>
                </label>
                <input
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  placeholder="Enter your email"
                  className="input input-bordered w-full focus:ring-2 focus:ring-purple-500"
                />
                {errors.email && (
                  <span className="text-sm text-red-500">
                    {errors.email.message}
                  </span>
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
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  placeholder="Enter your password"
                  className="input input-bordered w-full focus:ring-2 focus:ring-purple-500"
                />
                {errors.password && (
                  <span className="text-sm text-red-500">
                    {errors.password.message}
                  </span>
                )}
                <label className="label mt-2">
                  <a
                    href="#"
                    className="label-text-alt link link-hover text-purple-500"
                  >
                    Forgot password?
                  </a>
                </label>
              </div>

              {/* Submit Button */}
              <div className="form-control mt-6">
                <button className="btn btn-primary w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-indigo-500 hover:to-purple-500 text-white">
                  Login
                </button>
              </div>
            </form>

            {/* Additional Links */}
            <p className="text-center mt-4 text-gray-600">
              <small>
                New Here?{" "}
                <Link to="/signUp" className="text-purple-500 font-medium">
                  Create an account
                </Link>
              </small>
            </p>
            <div className="divider">OR</div>

            {/* Social Login */}
            <div className="p-4">
              <SocialLogin />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogIn;
