import React from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAxiosPublic from "../../hooks/useAxiosPublic";

// Image Hosting API Key
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateCamp = () => {
  const {
    _id,
    campName,
    image,
    fees,
    date,
    location,
    healthcareProfessional,
    description,
  } = useLoaderData();
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      // Image upload to imgbb
      const imageFile = { image: data.image[0] };
      const res = await axiosPublic.post(image_hosting_api, imageFile, {
        headers: { "content-type": "multipart/form-data" },
      });

      if (res.data.success) {
        const imageUrl = res.data.data.display_url;

        // Prepare data to save in the database
        const updatedCamp = {
          campName: data.campName,
          image: imageUrl,
          fees: parseFloat(data.fees),
          date: data.date,
          location: data.location,
          healthcareProfessional: data.healthcareProfessional,
          description: data.description,
        };

        // API call to update the camp
        const response = await axiosSecure.patch(`/camps/${_id}`, updatedCamp);
        if (response.data.modifiedCount > 0) {
          Swal.fire({
            icon: "success",
            title: `${camp?.campName} updated successfully!`,
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/dashboard/manageCamp");
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to upload image",
          text: "Please try again later.",
        });
      }
    } catch (error) {
      console.error("Error updating camp:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong!",
      });
    }
  };

  return (
    <div className="container mx-auto p-8 bg-gray-100 rounded shadow">
      <h2 className="text-3xl font-bold mb-6 text-center">Update Camp</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-5 items-center justify-center">
          <div className="form-control">
            <label className="label">Camp Name*</label>
            <input
              type="text"
              placeholder="Enter the camp name."
              defaultValue={campName}
              {...register("campName", { required: "Camp Name is required" })}
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">Image*</label>
            <input
              type="file"
              placeholder="Upload an image for the camp"
              {...register("image", { required: "Image is required" })}
              className="file-input"
            />
          </div>
          <div className="form-control">
            <label className="label">Camp Fees*</label>
            <input
              type="number"
              placeholder="Enter the camp fees."
              defaultValue={fees}
              {...register("fees", { required: "Fees is required" })}
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">Date & Time*</label>
            <input
              type="datetime-local"
              defaultValue={date}
              {...register("date", { required: "Date & Time is required" })}
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">Location*</label>
            <input
              type="text"
              defaultValue={location}
              placeholder="Enter the camp location."
              {...register("location", { required: "Location is required" })}
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">Healthcare Professional Name*</label>
            <input
              type="text"
              defaultValue={healthcareProfessional}
              placeholder="Enter the healthcare professional's name."
              {...register("healthcareProfessional", {
                required: "Healthcare Professional Name is required",
              })}
              className="input input-bordered"
            />
          </div>
        </div>
        <div className="form-control">
          <label className="label">Description</label>
          <textarea
            defaultValue={description}
            placeholder="Write a brief description about the camp (optional)"
            {...register("description")}
            className="textarea textarea-bordered"
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary w-full">
          Update Camp
        </button>
      </form>
    </div>
  );
};

export default UpdateCamp;
