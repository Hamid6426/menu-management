import React, { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const UserRegister = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const response = await axiosInstance.post("/auth/register", formData);
      setSuccess(t("userRegister.successMessage"));
      setTimeout(() => navigate("/login"), 2000);
      setFormData({ name: "", email: "", password: "" });
    } catch (err) {
      setError(err.response?.data?.message || t("userRegister.errorMessage"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-sm w-full mx-auto bg-white rounded shadow-md p-6 border-t-4 border-b-4 border-red-500 mt-10">
      <h2 className="text-2xl font-semibold text-center text-red-600 mb-4">
        {t("userRegister.title")}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">{t("userRegister.name")}</label>
          <input
            type="text"
            name="name"
            className="w-full border border-red-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            value={formData.name}
            onChange={handleChange}
            placeholder={t("userRegister.name")}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">{t("userRegister.email")}</label>
          <input
            type="email"
            name="email"
            className="w-full border border-red-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            value={formData.email}
            onChange={handleChange}
            placeholder={t("userRegister.email")}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">{t("userRegister.password")}</label>
          <input
            type="password"
            name="password"
            className="w-full border border-red-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            value={formData.password}
            onChange={handleChange}
            placeholder={t("userRegister.password")}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded transition"
        >
          {loading ? t("userRegister.registering") : t("userRegister.registerButton")}
        </button>
      </form>

      {error && (
        <div className="mt-4 text-sm text-red-700 bg-red-100 border border-red-400 rounded px-4 py-2">
          {error}
        </div>
      )}

      {success && (
        <div className="mt-4 text-sm text-green-700 bg-green-100 border border-green-400 rounded px-4 py-2">
          {success}
        </div>
      )}

      <p className="text-center text-sm mt-4">
        {t("userRegister.loginPrompt")}{" "}
        <Link to="/login" className="text-red-600 hover:underline">
          {t("userRegister.loginLink")}
        </Link>
      </p>
    </div>
  );
};

export default UserRegister;
