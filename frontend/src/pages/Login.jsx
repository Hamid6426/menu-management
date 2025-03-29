import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    // Reset error when user starts typing in the password field
    if (e.target.name === "password" && error) {
      setError(null);
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(null);
    setLoading(true);

    try {
      const response = await axiosInstance.post("/auth/login", formData);
      const { token, user } = response.data;

      setSuccess("Login successful!");
      setFormData({ email: "", password: "" });

      // Store token & user data immediately
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setTimeout(() => {
        const userId = user.userId;
        if (["admin", "manager", "super-admin"].includes(user.role)) {
          navigate("/dashboard");
        } else if (user.role) {
          if (!Array.isArray(user.allergies) || user.allergies.length === 0) {
            navigate(`/${userId}/add-allergies`);
          } else {
            navigate("/top-restaurants");
          }
        } else {
          setError("Invalid user role. Please contact support.");
        }
      }, 200);
    } catch (err) {
      const message =
        err.response?.data?.message ||
        (err.request ? "Network error. Please try again." : "An unexpected error occurred.");
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="bg-white shadow-lg rounded p-4 w-100" style={{ maxWidth: "400px" }}>
        <h2 className="text-center text-danger">Login</h2>

        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="text-end">
            <a href="/forgot-password" className="text-danger text-decoration-none">
              Forgot Password?
            </a>
          </div>

          <button type="submit" className="btn btn-danger w-100 mt-3" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>

        {error && <div className="alert alert-danger mt-3">{error}</div>}
        {success && <div className="alert alert-success mt-3">{success}</div>}

        <div className="d-flex align-items-center">
          <p className="text-center mt-3">Don't have an account?</p>
          <Link to="/register" className="mx-1 text-danger text-decoration-none">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
