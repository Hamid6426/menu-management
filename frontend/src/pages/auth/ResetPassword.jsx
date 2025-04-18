import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { useTranslation } from "react-i18next";

const ResetPassword = () => {
  const { resetToken } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    email: "",
    newPassword: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await axiosInstance.post(`/auth/reset-password/${resetToken}`, formData);
      setSuccess(response.data.message);
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      setError(err.response?.data?.message || t("resetPassword.error"));
    }
  };

  return (
    <div className="max-w-sm w-full mx-auto bg-white shadow-lg rounded-lg p-6 mt-10 border-t-4 border-b-4 border-red-500">
      <h2 className="text-2xl font-bold text-center text-red-600 mb-4">
        {t("resetPassword.title")}
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
          <label className="block text-sm font-medium mb-1">
            {t("resetPassword.emailLabel")}
          </label>
          <input
            type="email"
            name="email"
            className="w-full border border-red-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            value={formData.email}
            onChange={handleChange}
            placeholder={t("resetPassword.placeholderEmail")}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            {t("resetPassword.newPasswordLabel")}
          </label>
          <input
            type="password"
            name="newPassword"
            className="w-full border border-red-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            value={formData.newPassword}
            onChange={handleChange}
            placeholder={t("resetPassword.placeholderNewPassword")}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-red-500 text-white font-semibold py-2 rounded hover:bg-red-600 transition"
        >
          {t("resetPassword.resetButton")}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
