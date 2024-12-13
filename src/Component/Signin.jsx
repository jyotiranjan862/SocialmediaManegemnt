import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const Signin = () => {

  const navigate = useNavigate()
  const [data, setData] = useState({
    email: "",
    password: "",
    confirmPassword: "", // Used only for client-side validation
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Handle input changes
  const onChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Form validation
  const validateForm = () => {
    const validationErrors = {};
    if (!data.email) {
      validationErrors.email = "email is required.";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      validationErrors.email = "Enter a valid email address.";
    }
    if (!data.password) {
      validationErrors.password = "Password is required.";
    }
    if (data.password !== data.confirmPassword) {
      validationErrors.confirmPassword = "Passwords do not match.";
    }
    return validationErrors;
  };

  // Form submission handler
  const onSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);
    try {
      const payload = {
        email: data.email,
        password: data.password, // Exclude confirmPassword
      };

      const config = {
        method: "post",
        url: "http://localhost:5001/socialMediaManegement/users/login",
        headers: {
          "Content-Type": "application/json",
        },
        data: payload,
      };

      const response = await axios.request(config);
      setMessage("Login successful!");
      console.log("Response:", response.data);
      navigate('/dashboard')
    } catch (error) {
      console.error("Error:", error);
      setMessage("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-400">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Sign In
        </h1>
        {message && (
          <p
            className={`text-center mb-4 ${
              message.includes("successful")
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}
        <form onSubmit={onSubmit}>
          {/* email Input */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={data.email}
              onChange={onChange}
              placeholder="Enter your email"
              className={`w-full mt-1 p-2 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 ${
                errors.email ? "focus:ring-red-500" : "focus:ring-blue-400"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={data.password}
              onChange={onChange}
              placeholder="Enter password"
              className={`w-full mt-1 p-2 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 ${
                errors.password ? "focus:ring-red-500" : "focus:ring-blue-400"
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password Input */}
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={data.confirmPassword}
              onChange={onChange}
              placeholder="Confirm password"
              className={`w-full mt-1 p-2 border ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 ${
                errors.confirmPassword
                  ? "focus:ring-red-500"
                  : "focus:ring-blue-400"
              }`}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full bg-blue-600 text-white py-2 px-4 rounded-lg ${
              isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
            } focus:outline-none focus:ring-2 focus:ring-blue-400`}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signin;
