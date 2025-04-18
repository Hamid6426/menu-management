import React, { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next"; // Add translation import

const UserRegister = () => {
  const { t } = useTranslation(); // Initialize translation
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
    <div
      className="container bg-white shadow-lg rounded p-4"
      style={{ maxWidth: "400px", borderTop: "4px solid #ff6600", borderBottom: "4px solid #ff6600" }}
    >
      <h2 className="text-center mb-3" style={{ color: "#ff6600" }}>
        {t("userRegister.title")}
      </h2>

      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label className="form-label">{t("userRegister.name")}</label>
          <input
            type="text"
            name="name"
            className="form-control"
            style={{ borderColor: "#ffa500" }}
            value={formData.name}
            onChange={handleChange}
            placeholder={t("userRegister.name")}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">{t("userRegister.email")}</label>
          <input
            type="email"
            name="email"
            className="form-control"
            style={{ borderColor: "#ffa500" }}
            value={formData.email}
            onChange={handleChange}
            placeholder={t("userRegister.email")}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">{t("userRegister.password")}</label>
          <input
            type="password"
            name="password"
            className="form-control"
            style={{ borderColor: "#ffa500" }}
            value={formData.password}
            onChange={handleChange}
            placeholder={t("userRegister.password")}
            required
          />
        </div>

        <button
          type="submit"
          className="btn w-100 mt-3"
          style={{ backgroundColor: "#ff6600", color: "white" }}
          disabled={loading}
        >
          {loading ? t("userRegister.registering") : t("userRegister.registerButton")}
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

      <p className="text-center mt-3">
        {t("userRegister.loginPrompt")}{" "}
        <Link to="/login" className="text-decoration-none" style={{ color: "#ff6600" }}>
          {t("userRegister.loginLink")}
        </Link>
      </p>
    </div>
  );
};

export default UserRegister;
