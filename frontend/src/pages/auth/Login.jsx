import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { jwtDecode } from "jwt-decode";
import { useTranslation } from "react-i18next";

const Login = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

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
              setError(t("login.errorMessage"));
            }
          }, 200);
        }
      } catch (err) {
        console.error("Token decoding failed:", err);
      }
    }
  }, [navigate, t]);

  const handleChange = (e) => {
    if (e.target.name === "password" && error) setError(null);
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
      localStorage.setItem("token", token);

      if (!token) {
        setError(t("login.noTokenError"));
        return;
      }

      const decoded = jwtDecode(token);
      const username = decoded?.username;
      const role = decoded?.role;
      const allergies = decoded?.allergies;

      setSuccess(t("login.successMessage"));
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
          setError(t("login.errorMessage"));
        }
      }, 200);
    } catch (err) {
      const message =
        err.response?.data?.message ||
        (err.request ? t("login.networkError") : t("login.unexpectedError"));
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-sm w-full mx-auto bg-white p-6 shadow-lg rounded-lg mt-10 border-t-4 border-b-4 border-red-500">
      <h2 className="text-2xl font-bold text-center text-red-600 mb-4">
        {t("login.title")}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">{t("login.email")}</label>
          <input
            type="email"
            name="email"
            className="w-full border border-red-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            value={formData.email}
            onChange={handleChange}
            placeholder={t("login.email")}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">{t("login.password")}</label>
          <input
            type="password"
            name="password"
            className="w-full border border-red-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            value={formData.password}
            onChange={handleChange}
            placeholder={t("login.password")}
            required
          />
        </div>

        <div className="text-right text-sm">
          <Link to="/forgot-password" className="text-red-500 hover:underline">
            {t("login.forgotPassword")}
          </Link>
        </div>

        <button
          type="submit"
          className="w-full bg-red-500 text-white font-semibold py-2 rounded hover:bg-red-600 transition"
          disabled={loading}
        >
          {loading ? (
            <span className="animate-pulse">{t("login.loading")}</span>
          ) : (
            t("login.loginButton")
          )}
        </button>
      </form>

      {error && (
        <div className="mt-4 bg-red-100 text-red-700 px-4 py-2 rounded text-sm">
          {error}
        </div>
      )}
      {success && (
        <div className="mt-4 bg-green-100 text-green-700 px-4 py-2 rounded text-sm">
          {success}
        </div>
      )}

      <div className="flex justify-center items-center gap-1 mt-4 text-sm">
        <p>{t("login.registerPrompt")}</p>
        <Link to="/signup-as" className="text-red-500 hover:underline">
          {t("login.registerLink")}
        </Link>
      </div>
    </div>
  );
};

export default Login;
