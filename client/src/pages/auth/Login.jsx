import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosConfig";

const Login = () => {
  const navigate = useNavigate();

  // State for form data
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // State for submission status
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form validation: Ensure both fields are filled
  const isFormValid =
    formData.email.trim() !== "" && formData.password.trim() !== "";

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    setIsSubmitting(true);

    try {
      const response = await axiosInstance.post("/owners/login", formData);
      // Store token in localStorage
      localStorage.setItem("token", response.data.token);
      navigate("/admin/dashboard"); // Navigate to homepage after login
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Login failed. Please check your credentials.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto bg-white my-8 py-6 px-12 rounded-xl shadow-2xl drop-shadow-2xl w-[320px]">
      <h2 className="text-3xl font-semibold text-center text-black mb-6">
        Sign In
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Input */}
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="placeholder-neutral-500 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
          aria-invalid={!formData.email}
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
          aria-invalid={!formData.password}
          required
        />

        {/* Forgot Password Link */}
        <a
          href="/auth/forgot-password"
          className="text-red-600 text-sm hover:underline"
        >
          Forgot Password?
        </a>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting || !isFormValid}
          className={`w-full py-2 ${
            isSubmitting || !isFormValid
              ? "bg-red-400 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700"
          } text-white font-semibold rounded-lg focus:outline-none`}
        >
          {isSubmitting ? "Signing in..." : "Sign In"}
        </button>
      </form>

      {/* Signup Link */}
      <div className="mt-4 text-center">
        <p className="text-black text-sm">
          Don&apos;t have an account?&nbsp;
          <a
            href="/auth/register"
            className="text-red-600 font-semibold hover:underline"
          >
            Signup here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
