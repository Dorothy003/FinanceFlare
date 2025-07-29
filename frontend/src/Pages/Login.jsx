import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import RightImage from "../assets/Login-image.jpg";
import { FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", formData);
      localStorage.setItem("token", res.data.token);
;
  
      alert("Login successful!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
      alert("Login failed: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="w-screen h-screen flex overflow-hidden">
      {/* Left Login Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg--[#f1f3ff]">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-purple-900 mb-2">Login</h2>
          <p className="text-sm text-gray-600 mb-6">
            Don’t have an account?{" "}
            <a href="/signup" className="text-purple-600 hover:underline">
              Create your account
            </a>
          </p>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              required
              className="w-full mb-4 px-4 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="w-full mb-4 px-4 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
            />

            <div className="flex items-center justify-between text-sm mb-4">
              <label className="flex items-center gap-2 text-black">
                <input type="checkbox" />
                Remember Me
              </label>
              <a href="#" className="text-purple-600 hover:underline">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-gradient-to-r from-purple-500 to-blue-400 text-white font-bold rounded-full shadow-md hover:shadow-lg transition cursor-pointer"
            >
              LOGIN
            </button>
          </form>

          <p className="text-center mt-6 text-sm text-gray-600">Or login with</p>
          <div className="flex justify-center gap-4 mt-4">
            <a
              href="https://accounts.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-gray-700 p-3 rounded-full shadow hover:shadow-lg hover:bg-gray-100 transition"
            >
              <FcGoogle size={20} />
            </a>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-blue-600 p-3 rounded-full shadow hover:shadow-lg hover:bg-blue-100 transition"
            >
              <FaFacebookF size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Right Image Section */}
      <div className="hidden md:block w-1/2 relative">
        <img
          src={RightImage}
          alt="Login visual"
          className="absolute inset-0 w-full h-full object-cover clip-diagonal"
        />
        <div className="absolute inset-0 bg-black/40 clip-diagonal z-10 flex items-center justify-center text-white text-center px-8">
          <div className="z-20">
            <h2 className="text-6xl font-bold mb-4">Welcome Back.</h2>
            <p className="text-sm max-w-md ">
             Take control of your spending. Build the life you want.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
