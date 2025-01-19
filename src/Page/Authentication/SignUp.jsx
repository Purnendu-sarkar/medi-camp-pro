import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import SocialLogin from "./SocialLogin";

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
      console.log(result.user);
      updateUserProfile(data.name, data.photoURL).then(() => {
        console.log("user profile info updated");
        //Create user entry in the database
        const userInfo = {
          name: data.name,
          email: data.email,
          img: data.img,
          phoneNumber: data.phoneNumber,
          role: "admin",
        };

        axiosPublic.post("/users", userInfo).then((res) => {
          if (res.data.insertedId) {
            console.log("User Added to the database");
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
      console.error("Sign up failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Sign up now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                {...register("name", { required: true })}
                placeholder="Name"
                className="input input-bordered"
              />
              {errors.name && (
                <span className="text-red-600">Please provide your name</span>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Phone Number</span>
              </label>
              <input
                type="number"
                {...register("phoneNumber", {
                  required: true,
                  pattern: /^[0-9]{10,15}$/,
                })}
                placeholder="Phone Number"
                className="input input-bordered"
              />
              {errors.phoneNumber?.type === "required" && (
                <p className="text-red-600">Phone number is required</p>
              )}
              {errors.phoneNumber?.type === "pattern" && (
                <p className="text-red-600">
                  Enter a valid phone number (10-15 digits)
                </p>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Image URL</span>
              </label>
              <input
                type="text"
                {...register("img", { required: true })}
                placeholder="Image URL"
                className="input input-bordered"
              />
              {errors.img && (
                <span className="text-red-600">Image URL is required</span>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                placeholder="Email"
                className="input input-bordered"
              />
              {errors.email && (
                <span className="text-red-600">Email is required</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  maxLength: 20,
                  pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                })}
                placeholder="Password"
                className="input input-bordered"
              />
              {errors.password?.type === "required" && (
                <p className="text-red-600">Password is required</p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-600">
                  Password must be at least 6 characters
                </p>
              )}
              {errors.password?.type === "maxLength" && (
                <p className="text-red-600">
                  Password must be less than 20 characters
                </p>
              )}
              {errors.password?.type === "pattern" && (
                <p className="text-red-600">
                  Password must include 6–20 characters, with uppercase,
                  lowercase, number, and a special character.
                </p>
              )}
              <label className="label">
                <a
                  href="/forgot-password"
                  className="label-text-alt link link-hover"
                >
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <input
                className={`btn btn-primary ${loading ? "loading" : ""}`}
                type="submit"
                value={loading ? "Signing Up..." : "Sign Up"}
                disabled={loading}
              />
            </div>
          </form>
          <p className="text-center mt-1">
            <small>
              Already have an account? <Link to="/join-us">Join Us</Link>
            </small>
          </p>
          <div className="p-5">
            <SocialLogin></SocialLogin>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
