import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [autoLogin, setAutoLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const role = decoded?.role;
        setAutoLogin(true);
        setTimeout(() => {
          if (["super-admin"].includes(role)) {
            navigate(`/dashboard`);
          } else {
            setError("Invalid user");
          }
        }, 3000);
      } catch (err) {
        console.error("Token decoding failed:", err);
      }
    }
  }, [navigate]);

  const handleChange = (e) => {
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
      const { token } = response.data;

      if (!token) {
        setError("Token not received.");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", token);
      const decoded = jwtDecode(token);
      const role = decoded?.role;

      setSuccess("Login successful!");
      setFormData({ email: "", password: "" });

      setTimeout(() => {
        if (["super-admin"].includes(role)) {
          navigate(`/dashboard`);
        } else {
          setError("Invalid user");
        }
      }, 3000);
    } catch (err) {
      const message = err.response?.data?.message || "Login failed.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  // If autoLogin is triggered, show the animation instead of the form
  if (autoLogin) {
    return (
      <div className="bg-dark d-flex justify-content-center align-items-center vh-100">
        <div className="text-center">
          <h2 className="mb-3">Logging you in...</h2>
          <div className="spinner-border text-primary" role="status" />
        </div>
      </div>
    );
  }

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
              placeholder="Email"
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
              placeholder="Password"
              required
            />
          </div>

          <div className="text-end">
            <Link to="/forgot-password" className="text-danger text-decoration-none">
              Forgot Password?
            </Link>
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
