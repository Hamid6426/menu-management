import React, { useState } from "react";
import axiosInstance from "../utils/axiosInstance";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Submitting...");
    try {
      await axiosInstance.post("http://localhost:5000/api/contact", form);
      setStatus("Message sent!");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("Error sending message");
    }
  };

  return (
    <div className="container my-5">
      <div className="card mx-auto shadow" style={{ maxWidth: "500px", borderColor: "#ff8800" }}>
        <div className="card-body">
          <h3 className="card-title mb-4 text-center" style={{ color: "#ff6600" }}>
            Contact Us
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                type="text"
                required
                className="form-control"
                style={{ borderColor: "#ffa500" }}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                type="email"
                required
                className="form-control"
                style={{ borderColor: "#ffa500" }}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                className="form-control"
                rows="4"
                style={{ borderColor: "#ffa500" }}
              />
            </div>

            <button type="submit" className="btn w-100" style={{ backgroundColor: "#ff6600", color: "white" }}>
              Send Message
            </button>

            {status && (
              <div className="mt-3 text-center" style={{ color: "#ff6600" }}>
                {status}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
