import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAxiosPublic from "../../hooks/useAxiosPublic";

// Image Hosting API Key
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddCamp = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();

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
        const newCamp = {
          campName: data.campName,
          image: imageUrl,
          fees: parseFloat(data.fees),
          date: data.date,
          location: data.location,
          healthcareProfessional: data.healthcareProfessional,
          participantCount: 0,
          description: data.description,
        };

        // API call to save the camp
        const response = await axiosSecure.post("/camps", newCamp);
        if (response.data.insertedId) {
          reset();
          Swal.fire({
            position: "top-right",
            icon: "success",
            title: "Camp added successfully!",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to upload image",
          text: "Please try again later.",
        });
      }
    } catch (error) {
      console.error("Error adding camp:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong!",
      });
    }
  };

  return (
    <div className="container mx-auto h-screen p-8 bg-gray-100 rounded shadow">
      <h2 className="text-3xl font-bold mb-6 text-center">Add New Camp</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-5 items-center justify-center">
          <div className="form-control">
            <label className="label">Camp Name*</label>
            <input
              type="text"
              placeholder="Enter the camp name."
              {...register("campName", { required: "Camp Name is required" })}
              className="input input-bordered"
            />
            {errors.campName && (
              <p className="text-red-500">{errors.campName.message}</p>
            )}
          </div>
          <div className="form-control">
            <label className="label">Image*</label>
            <input
              type="file"
              placeholder="Upload an image for the camp"
              {...register("image", { required: "Image is required" })}
              className="file-input"
            />
            {errors.image && (
              <p className="text-red-500">{errors.image.message}</p>
            )}
          </div>
          <div className="form-control">
            <label className="label">Camp Fees*</label>
            <input
              type="number"
              placeholder="Enter the camp fees."
              {...register("fees", { required: "Fees is required" })}
              className="input input-bordered"
            />
            {errors.fees && (
              <p className="text-red-500">{errors.fees.message}</p>
            )}
          </div>
          <div className="form-control">
            <label className="label">Date & Time*</label>
            <input
              type="datetime-local"
              placeholder="Enter the camp date and time"
              {...register("date", { required: "Date & Time is required" })}
              className="input input-bordered"
            />
            {errors.date && (
              <p className="text-red-500">{errors.date.message}</p>
            )}
          </div>
          <div className="form-control">
            <label className="label">Location*</label>
            <input
              type="text"
              placeholder="Enter the camp location."
              {...register("location", { required: "Location is required" })}
              className="input input-bordered"
            />
            {errors.location && (
              <p className="text-red-500">{errors.location.message}</p>
            )}
          </div>
          <div className="form-control">
            <label className="label">Healthcare Professional Name*</label>
            <input
              type="text"
              placeholder="Enter the healthcare professional's name."
              {...register("healthcareProfessional", {
                required: "Healthcare Professional Name is required",
              })}
              className="input input-bordered"
            />
            {errors.healthcareProfessional && (
              <p className="text-red-500">
                {errors.healthcareProfessional.message}
              </p>
            )}
          </div>
        </div>
        <div className="form-control">
          <label className="label">Description</label>
          <textarea
            placeholder="Write a brief description about the camp (optional)"
            {...register("description")}
            className="textarea textarea-bordered"
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary w-full">
          Add Camp
        </button>
      </form>
    </div>
  );
};

export default AddCamp;
