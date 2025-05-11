import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";
import { imageUploaded } from "../../../utlity/api";

import jobImg from "../../../assets/images/job-img.webp";
import useRole from "../../../hooks/useRole";

const AddedJobTask = () => {
  const { userData, refetch } = useRole();
  const axiosSecure = useAxiosSecure();
  const [uploading, setUploading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm();
  const navigate = useNavigate();

  // user photo url
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;
    imageUploaded(file, setUploading, setValue);
  };

  const onSubmit = async (data) => {
    const totalPayableAmount = data.required_workers * data.payable_amount;
    if (totalPayableAmount > userData.coins) {
      toast.error("Not enough coins!").then((result) => {
        if (result.isConfirmed) {
          navigate("/dashboard/purchaseCoin");
        }
      });
      return;
    }

    //send data to the server with the image url

    const newTask = {
      task_title: data.task_title,
      task_detail: data.task_detail,
      required_workers: parseInt(data.required_workers),
      task_amount: parseInt(data.payable_amount),
      completion_date: data.completion_date,
      submission_info: data.submission_info,
      task_image_url: data.photoURL,
      totalPayableAmount,
      buyer_email: userData.email,
      buyer_name: userData.name,
      published: new Date().toLocaleDateString("en-CA"),
    };

    const response = await axiosSecure.post("/tasks", newTask);
    if (response.data.insertedId) {
      // toast.success("Successfully Added job!");
      // Reduce buyer's coins
      await axiosSecure.patch("/deduct-coins", { totalPayableAmount });
      toast.success("Task added successfully!");

      refetch();
      reset();
      navigate("/dashboard/my-tasks");
    }
  };

  return (
    <div className="min-h-[50vh] grid md:grid-cols-2">
      <div className="w-11/12 mx-auto p-6 my-10 bg-base-200 rounded-xl shadow-2xl">
        <h1 className="text-2xl font-bold mb-5">Add New Task</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Task Title */}
          <div>
            <label className="block mb-1   text-sm font-medium">
              Task Title
            </label>
            <input
              type="text"
              name="task_title"
              {...register("task_title", {
                required: "Task title is required",
              })}
              className="input input-bordered w-full focus:outline-none"
            />
            {errors.task_title && (
              <p className="text-red-500 ml-2">{errors.task_title.message}</p>
            )}
          </div>

          <div className="grid sm:grid-cols-2 gap-4 ">
            {/* Required Workers */}
            <div>
              <label className="block mb-1   text-sm font-medium">
                Required Workers
              </label>
              <input
                type="number"
                name="required_workers"
                {...register("required_workers", {
                  required: "Number of required workers is required",
                  min: { value: 1, message: "Must be at least 1 worker" },
                })}
                className="input input-bordered w-full focus:outline-none"
              />
              {errors.required_workers && (
                <p className="text-red-500 ml-2">
                  {errors.required_workers.message}
                </p>
              )}
            </div>

            {/* task Amount */}
            <div>
              <label className="block mb-1   text-sm font-medium">
                Amount (per worker)
              </label>
              <input
                type="number"
                name="payable_amount"
                {...register("payable_amount", {
                  required: "Payable amount is required",
                  min: { value: 1, message: "Must be at least 1 coin" },
                })}
                className="input input-bordered w-full focus:outline-none"
              />
              {errors.payable_amount && (
                <p className="text-red-500 ml-2">
                  {errors.payable_amount.message}
                </p>
              )}
            </div>
          </div>

          {/* Completion Date */}
          <div>
            <label className="block mb-1   text-sm font-medium">
              Completion Date
            </label>
            <input
              type="date"
              name="completion_date"
              {...register("completion_date", {
                required: "Completion date is required",
              })}
              className="input input-bordered w-full focus:outline-none"
            />
            {errors.completion_date && (
              <p className="text-red-500 ml-2">
                {errors.completion_date.message}
              </p>
            )}
          </div>

          {/* Submission Info */}
          <div>
            <label className="block mb-1   text-sm font-medium">
              Submission Info
            </label>
            <input
              type="text"
              name="submission_info"
              {...register("submission_info", {
                required: "Submission info is required",
              })}
              className="input input-bordered w-full focus:outline-none"
            />
            {errors.submission_info && (
              <p className="text-red-500 ml-2">
                {errors.submission_info.message}
              </p>
            )}
          </div>

          {/* Task Details */}
          <div>
            <label className="block mb-1   text-sm font-medium">
              Task Details
            </label>
            <textarea
              name="task_detail"
              {...register("task_detail", {
                required: "Task details are required",
              })}
              className="textarea textarea-bordered w-full focus:outline-none"
              rows="4"
            ></textarea>
            {errors.task_detail && (
              <p className="text-red-500 ml-2">{errors.task_detail.message}</p>
            )}
          </div>

          {/* Task Image URL */}
          <div>
            <label className="block mb-1   text-sm font-medium">
              Task Image URL
            </label>
            <input
              onChange={handleImageUpload}
              type="file"
              title="Choose your photo"
              accept="image/*"
              className="file-input file-input-bordered w-full focus:outline-none"
            />
            {uploading && <span className="text-blue-600">Uploading...</span>}
            {errors.task_image_url && (
              <p className="text-red-500 ml-2">
                {errors.task_image_url.message}
              </p>
            )}
          </div>

          {/* Hidden Input for Image URL */}
          <input type="hidden" {...register("photoURL", { required: true })} />

          {/* Add Task Button */}
          <button
            type="submit"
            className="btn bg-neutral text-white hover:bg-[#0d775dd7] font-semibold text-base px-5 border-none w-full"
          >
            Submit Now
          </button>
        </form>
      </div>

      <div className="max-md:hidden flex flex-col justify-center">
        <div className="mx-auto w-full px-2">
          <img src={jobImg} alt="job added icon" />
        </div>
      </div>
    </div>
  );
};

export default AddedJobTask;
