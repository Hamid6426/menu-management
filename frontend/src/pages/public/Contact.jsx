  import React, { useState } from "react";
  import axiosInstance from "../../utils/axiosInstance";

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
        await axiosInstance.post("/contact", form);
        setStatus("Message sent!");
        setForm({ name: "", email: "", message: "" });
      } catch (err) {
        setStatus("Error sending message");
      }
    };

    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="max-w-lg w-full bg-white p-6 rounded-lg shadow-lg border-l-4 border-orange-500">
        <h3 className="text-3xl font-bold text-center text-orange-600 mb-6">
          Contact Us
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              type="text"
              required
              className="mt-1 p-2 w-full border-2 border-orange-400 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              type="email"
              required
              className="mt-1 p-2 w-full border-2 border-orange-400 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              className="mt-1 p-2 w-full h-32 border-2 border-orange-400 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-4 text-white font-semibold bg-orange-600 hover:bg-orange-700 rounded-md transition duration-300"
          >
            Send Message
          </button>

          {status && (
            <div className="mt-4 text-center text-orange-600">
              {status}
            </div>
          )}
        </form>
      </div>
    </div>
    );
  };

  export default Contact;
