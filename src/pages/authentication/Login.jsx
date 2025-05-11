import React, { useRef, useState } from "react";
import signInImg from "../../assets/images/signin.jpg";
import Lottie from "lottie-react";
import signInanimated from "../../assets/signin.json";
import useAuth from "../../auth/useAuth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SocialLogIn from "../shareit/SocialLogIn";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { sendPasswordResetEmail } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import toast from "react-hot-toast";

const Login = () => {
  const { logIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const emailRef = useRef();
  const [showPassword, setShowPassword] = useState(false);

  const from = location.state?.from.pathName || "/";

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    try {
      await logIn(email, password).then(() => {
        toast.success("user Login successfully");
        navigate(from, { replace: true });
      });
    } catch (error) {
      toast.error(`Oops login filed...", ${error.message}`);
    }
  };

  // forget password
  const forgetPassword = async () => {
    const email = emailRef.current?.value;
    // const password = passwordRef.current?.value;

    if (!email) {
      toast.error("Please fill both email and password");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      // Login successful
    } catch (error) {
      console.log(error);
      if (error.code === "auth/user-not-found") {
        toast.error("No user found with this email!");
      } else if (error.code === "auth/wrong-password") {
        toast.error("Incorrect password");
      } else {
        toast.error(error.message);
      }
    }
  };

  return (
    <div
      style={{ backgroundImage: `url(${signInImg})` }}
      className="hero min-h-screen text-white"
    >
      <div className="hero-content w-full flex-col-reverse lg:flex-row lg:gap-30">
        <div className="card w-full max-w-lg shadow-2xl ">
          <form onSubmit={handleLogin} className="card-body">
            <fieldset className="fieldset gap-6">
              {/* email field */}
              <div className="lg:flex gap-4 space-y-2">
                <label className="label flex-1/4 font-medium text-sm text-[#f1d300]">
                  Your Email :
                </label>
                <div className="flex-3/4">
                  <input
                    ref={emailRef}
                    name="email"
                    type="email"
                    className="input bg-[#4b6b00] text-white focus:outline-none border-none font-medium"
                    placeholder="Your Email"
                  />
                </div>
              </div>

              {/* password field */}
              <div className="lg:flex gap-4 space-y-2">
                <label className="label flex-1/4 font-medium text-sm text-[#f1d300]">
                  Your Password :
                </label>
                <div className="flex-3/4 relative">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    className="input bg-[#4b6b00] text-white focus:outline-none border-none font-medium"
                    placeholder="Your Password"
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    type="button"
                    className=" z-30 border-none bg-transparent text-white text-base absolute right-8 top-3 "
                  >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </button>
                </div>
              </div>

              {/* button field */}
              <div className="lg:flex gap-4 space-y-2">
                <label className="label flex-1/4 font-medium text-sm text-[#f1d300]">
                  Login :
                </label>
                <div className="flex-3/4">
                  <input
                    className="input bg-[#4b6b00] text-[#f1d300] focus:outline-none border-none font-medium uppercase cursor-pointer"
                    type="submit"
                    value="Login"
                  />
                </div>
              </div>

              {/* forgot password field */}
              <div className="lg:flex gap-4 space-y-2">
                <label className="label flex-1/4 font-medium text-sm text-[#f1d300]">
                  Forgot password :
                </label>
                <div className="flex-3/4">
                  <input
                    onClick={forgetPassword}
                    className="input  bg-transparent text-[#f1d300] focus:outline-none border-none font-medium cursor-pointer"
                    type="submit"
                    value="Forget Password"
                  />
                </div>
              </div>
            </fieldset>
          </form>

          {/* Google SignIn button */}
          <div className="text-right">
            <SocialLogIn />
          </div>
          <p className="ml-6 mb-4 text-center">
            Don't have an Account!{" "}
            <Link to="/signup" className="text-purple-600 underline font-bold">
              Sign Up
            </Link>
          </p>
        </div>

        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <Lottie animationData={signInanimated} className="w-96" />
        </div>
      </div>
    </div>
  );
};

export default Login;
