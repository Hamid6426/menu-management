import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosConfig";

const Register = () => {
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  // Submission and message state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    setIsSubmitting(true);
    setMessage("");
  
    try {
      await axiosInstance.post("/owners/register", formData);
      navigate("/auth/verify-email"); // Navigate without reloading
    } catch (error) {
      console.error("Error registering user:", error);
  
      if (error.response) {
        // Backend returned an error response
        const { status, data } = error.response;
  
        if (status === 400) {
          setMessage(data.message || "Invalid input. Please check your details.");
        } else if (status === 409) {
          setMessage("Email already exists. Try logging in.");
        } else if (status === 500) {
          setMessage("Server error. Please try again later.");
        } else {
          setMessage("Something went wrong. Please try again.");
        }
      } else if (error.request) {
        // No response from server
        setMessage("No response from server. Check your internet connection.");
      } else {
        // Other errors
        setMessage("Unexpected error occurred. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto bg-white my-8 py-6 px-12 rounded-xl shadow-2xl drop-shadow-2xl w-[320px]">
      <h2 className="text-3xl font-semibold text-center text-black mb-6">Signup</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name Input */}
        <input
          type="text"
          id="fullName"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          className="placeholder-neutral-500 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
          required
        />

        {/* Email Input */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="placeholder-neutral-500 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
          required
        />

        {/* Password Input */}
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="placeholder-neutral-500 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
          required
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2 ${
            isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"
          } text-white font-semibold rounded-lg focus:outline-none`}
        >
          {isSubmitting ? "Submitting..." : "Signup"}
        </button>

        {/* Error Message */}
        {message && <p className="text-red-500 mt-2 text-center">{message}</p>}
      </form>

      {/* Sign-in Link */}
      <div className="mt-4 text-center">
        <p className="text-black text-sm">
          Already have an account?{" "}
          <a href="/auth/login" className="text-red-600 font-semibold hover:underline">
            Sign in here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
