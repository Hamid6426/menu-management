import React, { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useTranslation } from "react-i18next";

const ForgotPassword = () => {
  const { t } = useTranslation();  // Using the useTranslation hook to get localized text
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await axiosInstance.post("/auth/forgot-password", { email });
      setSuccess(response.data.message);
      setEmail("");
    } catch (err) {
      setError(err.response?.data?.message || t("forgotPassword.error"));
    }
  };

  return (
    <div 
      className="d-flex justify-content-center align-items-center vh-100" 
      style={{
        backgroundImage: "url('/images/restaurant-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backdropFilter: "blur(5px)"
      }}
    >
      <div className="forgot-password-form p-4 rounded shadow bg-white mx-auto" style={{ maxWidth: "400px" }}>
        <h2 className="mb-4 text-center text-danger">{t("forgotPassword.title")}</h2>

        {/* Alert Messages */}
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{t("forgotPassword.success")}</div>}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">{t("forgotPassword.emailLabel")}</label>
            <input
              type="email"
              className="form-control border-danger"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("forgotPassword.placeholderEmail")}
              required
            />
          </div>

          <button type="submit" className="btn btn-danger w-100">
            {t("forgotPassword.sendResetLink")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
