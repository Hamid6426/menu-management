import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { jwtDecode } from "jwt-decode"; // ensure default import
import { useTranslation } from "react-i18next"; // Add this import

const Login = () => {
  const { t } = useTranslation(); // Initialize translation
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  // New useEffect to check for a stored token on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const username = decoded?.username;
        const role = decoded?.role;
        const allergies = decoded?.allergies;

        if (username) {
          setTimeout(() => {
            if (["admin", "manager", "super-admin"].includes(role)) {
              navigate(`/admin/dashboard`);
            } else if (role) {
              if (!Array.isArray(allergies) || allergies.length === 0) {
                navigate(`/settings/add-allergies`);
              } else {
                navigate("/restaurants");
              }
            } else {
              setError(t("login.errorMessage")); // Translated error message
            }
          }, 200);
        }
      } catch (err) {
        console.error("Token decoding failed:", err);
      }
    }
  }, [navigate, t]);

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

      // Store token & user data immediately
      localStorage.setItem("token", token);

      if (!token) {
        setError(t("login.noTokenError")); // Translated error message
        return;
      }

      const decoded = jwtDecode(token);
      const username = decoded?.username;
      const role = decoded?.role;
      const allergies = decoded?.allergies;

      setSuccess(t("login.successMessage")); // Translated success message
      setFormData({ email: "", password: "" });

      setTimeout(() => {
        if (["admin", "manager", "super-admin"].includes(role)) {
          navigate(`/admin/dashboard`);
        } else if (role) {
          if (!Array.isArray(allergies) || allergies.length === 0) {
            navigate(`/settings/add-allergies`);
          } else {
            navigate("/restaurants");
          }
        } else {
          setError(t("login.errorMessage")); // Translated error message
        }
      }, 200);
    } catch (err) {
      const message =
        err.response?.data?.message || (err.request ? t("login.networkError") : t("login.unexpectedError")); // Translated error message
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
    className="container bg-white shadow-lg rounded p-4"
    style={{ maxWidth: "400px", borderTop: "4px solid #ff6600", borderBottom: "4px solid #ff6600" }}
  >
        <h2 className="text-center mb-4" style={{ color: "#ff6600" }}>
          {t("login.title")}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">{t("login.email")}</label>
            <input
              type="email"
              name="email"
              className="form-control"
              style={{ borderColor: "#ffa500" }}
              value={formData.email}
              onChange={handleChange}
              placeholder={t("login.email")}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">{t("login.password")}</label>
            <input
              type="password"
              name="password"
              className="form-control"
              style={{ borderColor: "#ffa500" }}
              value={formData.password}
              onChange={handleChange}
              placeholder={t("login.password")}
              required
            />
          </div>

          <div className="text-end">
            <Link to="/forgot-password" className="text-decoration-none" style={{ color: "#ff6600" }}>
              {t("login.forgotPassword")}
            </Link>
          </div>

          <button
            type="submit"
            className="btn w-100 mt-3"
            disabled={loading}
            style={{ backgroundColor: "#ff6600", color: "white" }}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                {t("login.loading")}
              </>
            ) : (
              t("login.loginButton")
            )}
          </button>
        </form>

        {error && (
          <div className="alert mt-3" style={{ backgroundColor: "#ffe6e6", color: "#cc0000" }}>
            {error}
          </div>
        )}
        {success && (
          <div className="alert mt-3" style={{ backgroundColor: "#e6ffe6", color: "#007700" }}>
            {success}
          </div>
        )}

        <div className="d-flex justify-content-center align-items-center mt-3">
          <p className="mb-0">{t("login.registerPrompt")}</p>
          <Link to="/signup-as" className="ms-1 text-decoration-none" style={{ color: "#ff6600" }}>
            {t("login.registerLink")}
          </Link>
        </div>
      </div>
  );
};

export default Login;
