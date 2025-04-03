import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { useTranslation } from "react-i18next";

const ResetPassword = () => {
  const { resetToken } = useParams(); // Get token from URL params
  const navigate = useNavigate();
  const { t } = useTranslation();  // Using the useTranslation hook

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
      setTimeout(() => navigate("/login"), 3000); // Redirect after success
    } catch (err) {
      setError(err.response?.data?.message || t("resetPassword.error"));
    }
  };

  return (
    <div className="reset-password-form p-4 rounded shadow bg-white mx-auto" style={{ maxWidth: "400px" }}>
      <h2 className="mb-4 text-center">{t("resetPassword.title")}</h2>

      {/* Alert Messages */}
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">{t("resetPassword.emailLabel")}</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            placeholder={t("resetPassword.placeholderEmail")}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">{t("resetPassword.newPasswordLabel")}</label>
          <input
            type="password"
            name="newPassword"
            className="form-control"
            value={formData.newPassword}
            onChange={handleChange}
            placeholder={t("resetPassword.placeholderNewPassword")}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          {t("resetPassword.resetButton")}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
