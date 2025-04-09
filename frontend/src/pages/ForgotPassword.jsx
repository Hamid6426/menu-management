import React, { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useTranslation } from "react-i18next";

const ForgotPassword = () => {
  const { t } = useTranslation(); // Using the useTranslation hook to get localized text
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
      className="container bg-white shadow-lg rounded p-4"
      style={{ maxWidth: "400px", borderTop: "4px solid #ff6600", borderBottom: "4px solid #ff6600" }}
    >
      <h2 className="mb-4 text-center" style={{ color: "#ff6600" }}>
        {t("forgotPassword.title")}
      </h2>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{t("forgotPassword.success")}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">{t("forgotPassword.emailLabel")}</label>
          <input
            type="email"
            className="form-control"
            style={{ borderColor: "#ffa500" }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("forgotPassword.placeholderEmail")}
            required
          />
        </div>

        <button type="submit" className="btn w-100" style={{ backgroundColor: "#ff6600", color: "white" }}>
          {t("forgotPassword.sendResetLink")}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
