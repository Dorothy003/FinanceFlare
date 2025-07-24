import React from "react";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import signupImg from "../assets/Login-image.jpg"; // Adjust path if needed

const Signup = () => {
  return (
    <div className="min-h-screen flex bg-[#fefffd]">
      {/* Left - Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-16">
        <h2 className="text-3xl font-bold mb-2 text-purple-900">Create an account .</h2>
        <p className="text-gray-500 mb-6">Sign up to create an account and explore many things</p>

        <form className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="First & last name"
              className="w-full p-3 text-black border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <input
              type="email"
              placeholder="name@example.com"
              className="w-full p-3  text-black border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3  text-black border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="flex items-center space-x-2 text-sm text-black">
            <input type="checkbox" className="w-4 h-4" />
            <label>
              Yes, I understand and agree to the{" "}
              <a href="#" className="text-purple-600 underline">
                Terms of Service
              </a>
            </label>
          </div>

          <button
            type="submit"
            className="w-full  bg-gradient-to-r from-purple-500 to-blue-400  text-white py-3 rounded-md font-semibold  cursor-pointer"
          >
            Sign up
          </button>

          <button
            type="button"
            className="w-full flex items-center text-black justify-center border py-2 rounded-md space-x-2 hover:bg-purple-100 cursor-pointer"
          >
            <FaGoogle />
            <span>Sign up with Google</span>
          </button>

          <button
            type="button"
            className="w-full flex items-center text-black justify-center border py-2 rounded-md space-x-2 hover:bg-purple-100 cursor-pointer"
          >
            <FaFacebook />
            <span>Sign up with Facebook</span>
          </button>
          <div className="text-sm text-center mt-4 text-black">
  Already have an account?{" "}
  <a href="/" className="text-purple-600 underline hover:text-purple-800">
    Sign in
  </a>
</div>

        </form>
      </div>

      {/* Right - Image */}
      <div className="hidden md:flex w-1/2 bg-blue-500 text-white items-center justify-center relative">
        <img src={signupImg} alt="Signup Visual" className="object-cover h-full w-full opacity-90" />
        <div className="absolute bottom-10 left-10 max-w-sm">
          <h3 className="text-2xl font-bold mb-2">A special card for you</h3>
          <p className="text-white text-sm">
            For someone who deserves something special. Your creativity, kindness, and hard work inspire us every day.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
