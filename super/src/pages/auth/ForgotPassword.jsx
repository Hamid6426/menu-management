import React, { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await axiosInstance.post("/auth/forgot-password", { email });
      setSuccess(response.data.message || "Password reset link sent successfully.");
      setEmail("");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
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
        <h2 className="mb-4 text-center text-danger">Forgot Password</h2>

        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control border-danger"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <button type="submit" className="btn btn-danger w-100">
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
