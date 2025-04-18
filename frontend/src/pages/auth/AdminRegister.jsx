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
      setFormData({ name: "", email: "", password: "" });
    } catch (err) {
      setError(err.response?.data?.message || t("adminRegister.errorMessage"));
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
        {t("adminRegister.title")}
      </h2>

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

      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label className="form-label">{t("adminRegister.name")}</label>
          <input
            type="text"
            name="name"
            className="form-control"
            style={{ borderColor: "#ffa500" }}
            value={formData.name}
            onChange={handleChange}
            placeholder={t("adminRegister.name")}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">{t("adminRegister.username")}</label>
          <input
            type="text"
            name="username"
            className="form-control"
            style={{ borderColor: "#ffa500" }}
            value={formData.username}
            onChange={handleChange}
            placeholder={t("adminRegister.username")}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">{t("adminRegister.email")}</label>
          <input
            type="email"
            name="email"
            className="form-control"
            style={{ borderColor: "#ffa500" }}
            value={formData.email}
            onChange={handleChange}
            placeholder={t("adminRegister.email")}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">{t("adminRegister.password")}</label>
          <input
            type="password"
            name="password"
            className="form-control"
            style={{ borderColor: "#ffa500" }}
            value={formData.password}
            onChange={handleChange}
            placeholder={t("adminRegister.password")}
            required
          />
        </div>

        <button
          type="submit"
          className="btn w-100 mt-3"
          style={{ backgroundColor: "#ff6600", color: "white" }}
          disabled={loading}
        >
          {loading ? t("adminRegister.registering") : t("adminRegister.registerButton")}
        </button>

        <p className="text-center mt-3">
          {t("userRegister.loginPrompt")}{" "}
          <Link to="/login" className="text-decoration-none" style={{ color: "#ff6600" }}>
            {t("userRegister.loginLink")}
          </Link>
        </p>
      </form>
    </div>
  );
};

export default AdminRegister;
