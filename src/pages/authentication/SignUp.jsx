import React, { useState } from "react";
import Lottie from "lottie-react";

import signupAnimation from "../../assets/Animation - 1742476398048.json";
import signupImg from "../../assets/images/bg-signup.jpg";
import { useForm } from "react-hook-form";
import useAuth from "../../auth/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { imageUploaded } from "../../utlity/api";
import SocialLogIn from "../shareit/SocialLogIn";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import toast from "react-hot-toast";
import { saveUser } from "../../utlity/emailApi";

const SignUp = () => {
  const { createUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  // user photo url
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    console.log(file);

    if (!file) return;
    imageUploaded(file, setUploading, setValue);
  };
  // form submit handler
  const onSubmit = async (data) => {
    const email = data.email;
    const name = data.name;
    const password = data.password;
    const role = data.role;
    const photo = data.photoURL;
    const coins = data.role === "Worker" ? 10 : 50;

    const userInfo = {
      email,
      name,
      role,
      photo,
      coins,
    };
    // cheek user photo url
    if (!data.photoURL) {
      return toast.error("please choose your photo");
    }
    try {
      // new user create
      await createUser(email, password);

      // update user profile
      await updateUserProfile(name, photo);

      // save user inforemation
      await saveUser(userInfo);
      reset();
      toast.success("Sign up Successfully");
      navigate("/");
    } catch (err) {
      // toast.error(`Ohh! Account already exists${err.message}`);
      if (err.code === "auth/email-already-in-use") {
        toast.error("This email is already registered!");
      } else {
        toast.error(err.message);
      }
    }
  };
  return (
    <div
      style={{ backgroundImage: `url(${signupImg})` }}
      className="hero min-h-screen"
    >
      <div className="hero-content w-full flex-col-reverse lg:flex-row lg:gap-30">
        <div className="card w-full max-w-lg shadow-2xl">
          {/* name fild */}
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <fieldset className="fieldset space-y-6">
              <div className="flex gap-4">
                <label className="label flex-1/4 font-bold">Your Name :</label>
                <div className=" flex-3/4">
                  <input
                    {...register("name", { required: true })}
                    type="name"
                    className="input focus:outline-none border-none"
                    placeholder="Your Name"
                  />
                  {errors.name && (
                    <span className="text-red-600">Name is Required</span>
                  )}
                </div>
              </div>
              {/*email fild */}
              <div className="flex gap-4">
                <label className="label flex-1/4 font-bold">Your Email :</label>
                <div className="flex-3/4">
                  <input
                    {...register("email", { required: true })}
                    type="email"
                    className="input  focus:outline-none border-none"
                    placeholder="Your Email"
                  />
                  {errors.email && (
                    <span className="text-red-600">Email is Required</span>
                  )}
                </div>
              </div>

              {/* File Upload Field */}
              <div className="flex gap-4">
                <label className="label flex-1/4 font-bold">Your Image :</label>
                <div className="flex-3/4">
                  <input
                    type="file"
                    title="Choose your photo"
                    accept="image/*"
                    className="file-input file-input-bordered focus:outline-none border-none"
                    onChange={handleImageUpload}
                  />
                  {uploading && (
                    <span className="text-blue-600">Uploading...</span>
                  )}
                </div>
              </div>

              {/* Hidden Input for Image URL */}
              <input
                type="hidden"
                {...register("photoURL", { required: true })}
              />

              {/* password fild */}
              <div className="flex gap-4 ">
                <label className="label flex-1/4 font-bold">
                  Your Password :
                </label>
                <div className="flex-3/4 relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="input focus:outline-none border-none"
                    placeholder="Your Password"
                    {...register("password", {
                      required: "Password is required",
                      pattern: {
                        value:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{6,}$/,
                        message:
                          "Password must have 1 uppercase, 1 lowercase, 1 number, and 1 special character",
                      },
                    })}
                  />
                  {errors.password && (
                    <span className="text-red-500">
                      {errors.password.message}
                    </span>
                  )}
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    type="button"
                    className="btn btn-xs z-30 border-none hover:bg-transparent text-base absolute right-6 top-2 "
                  >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </button>
                </div>
              </div>
              <div className="flex gap-4 ">
                <label className="label flex-1/4 font-bold">
                  Select the Role :
                </label>
                <div className="flex-3/4">
                  <select
                    {...register("role", { required: "Role is required" })}
                    defaultValue=""
                    className="select focus:outline-none border-none"
                  >
                    <option value="" disabled>
                      Select the Role
                    </option>
                    <option value="Buyer">Buyer</option>
                    <option value="Worker">Worker</option>
                  </select>
                  {errors.role && (
                    <p className="text-red-500">{errors.role.message}</p>
                  )}
                </div>
              </div>

              {/*button fild */}
              <div className="flex gap-4">
                <label className="label flex-1/4 font-bold cursor-pointer ">
                  Sign Up :
                </label>
                <div className="flex-3/4">
                  <input
                    className="input bg-[#f56d19] font-medium text-white uppercase cursor-pointer focus:outline-none border-none"
                    type="submit"
                    value="Sign up"
                  />
                </div>
              </div>
            </fieldset>
          </form>
          <div className="text-right">
            <SocialLogIn />
          </div>
          <p className="ml-6 mb-4 text-center">
            Alrady have an Account!{" "}
            <Link to="/login" className="text-purple-600 underline font-bold">
              Sign In
            </Link>
          </p>
        </div>
        <div className="text-center lg:text-left">
          <h1 className="text-5xl text-gray-800 font-bold">Sign up now!</h1>
          <Lottie animationData={signupAnimation} className="w-96" />;
        </div>
      </div>
    </div>
  );
};

export default SignUp;
