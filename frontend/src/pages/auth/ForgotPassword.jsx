import React, { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useTranslation } from "react-i18next";

const ForgotPassword = () => {
  const { t } = useTranslation();
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
    <div className="max-w-sm w-full mx-auto bg-white shadow-lg rounded-lg p-6 border-t-4 border-b-4 border-red-500 mt-10">
      <h2 className="text-2xl font-bold text-center text-red-600 mb-4">
        {t("forgotPassword.title")}
      </h2>

      {error && (
        <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-sm">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-100 text-green-700 px-4 py-2 rounded mb-4 text-sm">
          {t("forgotPassword.success")}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            {t("forgotPassword.emailLabel")}
          </label>
          <input
            type="email"
            className="w-full border border-red-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("forgotPassword.placeholderEmail")}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-red-500 text-white font-semibold py-2 rounded hover:bg-red-600 transition"
        >
          {t("forgotPassword.sendResetLink")}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
