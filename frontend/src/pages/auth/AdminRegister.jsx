import React, { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const AdminRegister = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ name: "", username: "", email: "", password: "" });
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
      const response = await axiosInstance.post("/auth/admin-register", formData);
      setSuccess(response.data.message);
      setTimeout(() => navigate("/admin-login"), 2000);
      setFormData({ name: "", username: "", email: "", password: "" });
    } catch (err) {
      setError(err.response?.data?.message || t("adminRegister.errorMessage"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-sm w-full mx-auto bg-white shadow-lg rounded-lg p-6 border-t-4 border-b-4 border-red-500 mt-10">
      <h2 className="text-2xl font-bold text-center text-red-600 mb-4">
        {t("adminRegister.title")}
      </h2>

      {error && (
        <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-sm">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-100 text-green-700 px-4 py-2 rounded mb-4 text-sm">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">{t("adminRegister.name")}</label>
          <input
            type="text"
            name="name"
            className="w-full border border-red-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            value={formData.name}
            onChange={handleChange}
            placeholder={t("adminRegister.name")}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">{t("adminRegister.username")}</label>
          <input
            type="text"
            name="username"
            className="w-full border border-red-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            value={formData.username}
            onChange={handleChange}
            placeholder={t("adminRegister.username")}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">{t("adminRegister.email")}</label>
          <input
            type="email"
            name="email"
            className="w-full border border-red-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            value={formData.email}
            onChange={handleChange}
            placeholder={t("adminRegister.email")}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">{t("adminRegister.password")}</label>
          <input
            type="password"
            name="password"
            className="w-full border border-red-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            value={formData.password}
            onChange={handleChange}
            placeholder={t("adminRegister.password")}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-red-500 text-white font-semibold py-2 rounded hover:bg-red-600 transition"
          disabled={loading}
        >
          {loading ? t("adminRegister.registering") : t("adminRegister.registerButton")}
        </button>

        <p className="text-center text-sm mt-4 text-gray-600">
          {t("userRegister.loginPrompt")}{" "}
          <Link to="/login" className="text-red-600 hover:underline">
            {t("userRegister.loginLink")}
          </Link>
        </p>
      </form>
    </div>
  );
};

export default AdminRegister;
