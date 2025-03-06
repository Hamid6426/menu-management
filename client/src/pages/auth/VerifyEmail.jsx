import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosConfig";

const VerifyEmail = () => {
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    email: "",
    verificationCode: "",
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
      await axiosInstance.post("/owners/verify-email", formData);
      navigate("/auth/login"); // Navigate without reloading
    } catch (error) {
      console.error("Error verifying email:", error);
      setMessage("Verification failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto bg-white my-8 py-6 px-12 rounded-xl shadow-2xl drop-shadow-2xl w-[320px]">
      <h2 className="text-3xl font-semibold text-center text-black mb-6">Verify Your Email</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
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

        {/* Verification Code Input */}
        <input
          type="text"
          name="verificationCode"
          placeholder="Verification Code"
          value={formData.verificationCode}
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
          {isSubmitting ? "Verifying..." : "Verify Email"}
        </button>

        {/* Error Message */}
        {message && <p className="text-red-500 mt-2 text-center">{message}</p>}
      </form>

      {/* Resend Code Link */}
      <div className="mt-4 text-center">
        <p className="text-black text-sm">
          Didn't receive a code?{" "}
          <a href="/auth/resend-code" className="text-red-600 font-semibold hover:underline">
            Resend Code
          </a>
        </p>
      </div>
    </div>
  );
};

export default VerifyEmail;
