import React, { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import axiosInstance from "../utils/axiosInstance";
import "../../styles/Login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [Loading, setLoading] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previos error
    setSuccess(null);
    setLoading(true); // Show a loading state

    try {
      const response = await axiosInstance.post("/auth/login", formData);
      const { token, user } = response.data;

      // Save token and user to localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setSuccess("Login successful!");
      setFormData({ email: "", password: "" });

      const userId = user.id;
      // Redirect based on allergies
      if (!Array.isArray(user.allergies) || user.allergies.length === 0) {
        navigate(`/${userId}/add-allergies`);
      } else {
        navigate("/restaurants");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false); // Hide loading state
    }
  };

  return (
    <div className="login-form p-4 rounded shadow bg-white">
      <h2 className="mb-4 text-center">Login</h2>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
        </Form.Group>

        <p className="mt-3 text-end">
          <a href="/forgot-password">Forgot Password?</a>
        </p>

        <Button variant="primary" type="submit" className="w-100">
          Login
        </Button>
      </Form>

      <p className="text-center mt-3">
        Don't have an account? <a href="/register">Register</a>
      </p>
    </div>
  );
};

export default Login;
