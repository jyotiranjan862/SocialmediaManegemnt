import React, { useState } from "react";
import axios from 'axios';

const Signup = () => {
  const [data, setData] = useState({
    userName: "",
    email: "",
    password: "",
    phone: "",
    userType: "client",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const submitSignUpForm = (e) => {
    e.preventDefault();
  
    // Prepare payload for the request
    let payload = JSON.stringify(data);
  
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:5001/socialMediaManegement/users/create",
      headers: {
        "Content-Type": "application/json",
      },
      data: payload,
    };
  
    // Send POST request
    axios
      .request(config)
      .then((response) => {
        console.log("Response:", response.data);
        alert("User successfully created!"); // Optional success message
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred. Please try again."); // Optional error message
      });
  };

  return (
    <>
      <div className="w-full min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 flex justify-center items-center">
        <div className="lg:w-1/3 md:w-1/2 w-11/12 h-auto bg-white shadow-lg rounded-lg p-6 lg:my-6">
          <h1 className="text-center text-2xl md:text-3xl text-gray-800 font-bold mb-6">
            Sign Up
          </h1>
          <form onSubmit={submitSignUpForm} className="space-y-4">
            {/* Username */}
            <div className="flex flex-col">
              <label
                htmlFor="userName"
                className="text-gray-700 font-medium mb-1"
              >
                Username
              </label>
              <input
                type="text"
                id="userName"
                value={data.userName}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter Your Name"
                required
              />
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label htmlFor="email" className="text-gray-700 font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={data.email}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter Your Email"
                required
              />
            </div>

            {/* Password */}
            <div className="flex flex-col">
              <label
                htmlFor="password"
                className="text-gray-700 font-medium mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={data.password}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter Your Password"
                required
              />
            </div>

            {/* Phone */}
            <div className="flex flex-col">
              <label
                htmlFor="phone"
                className="text-gray-700 font-medium mb-1"
              >
                Phone Number
              </label>
              <input
                type="text"
                id="phone"
                value={data.phone}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter Your Phone Number"
                required
              />
            </div>

            {/* User Type */}
            <div className="flex flex-col">
              <label
                htmlFor="userType"
                className="text-gray-700 font-medium mb-1"
              >
                User Type
              </label>
              <select
                id="userType"
                value={data.userType}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-3 py-2 text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="client">Client</option>
                <option value="manager">Manager</option>
              </select>
            </div>

            {/* Submit Button */}
          <div className="w-full flex justify-center">
          <button
              type="submit"
              className="w-[8rem] bg-gray-900 hover:bg-gray-700 text-white text-lg font-medium py-2 rounded-xl tracking-wide mt-4 transition-all duration-300"
            >
              Sign Up
            </button>
          </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
