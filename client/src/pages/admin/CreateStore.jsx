import React, { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";

export default function CreateStore() {
  const [formData, setFormData] = useState({
    storeName: "",
    description: "",
    address: "",
    storePhone: "",
    storeEmail: "",
    storeWebsite: "",
    storeThumbnail: null,
  });

  const [preview, setPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "storeThumbnail") {
      const file = files[0];

      if (file && file.size > 2 * 1024 * 1024) {
        setMessage("File size should be less than 2MB");
        return;
      }

      if (
        file &&
        !["image/jpeg", "image/png", "image/jpg"].includes(file.type)
      ) {
        setMessage("Only JPG, JPEG, and PNG formats are allowed");
        return;
      }

      setFormData({ ...formData, storeThumbnail: file });

      // Generate image preview
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleRemoveImage = () => {
    setFormData({ ...formData, storeThumbnail: null });
    setPreview(null);
    document.getElementById("storeThumbnail").value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("Authentication error. Please log in again.");
        setIsSubmitting(false);
        return;
      }

      let ownerId = "";
      try {
        const decodedToken = jwtDecode(token);
        ownerId = decodedToken?.ownerId || "";
      } catch (error) {
        setMessage("Invalid token. Please log in again.");
        setIsSubmitting(false);
        return;
      }

      const formDataToSend = new FormData();
      for (const key in formData) {
        if (formData[key]) {
          formDataToSend.append(key, formData[key]);
        }
      }
      formDataToSend.append("ownerId", ownerId);

      await axios.post("http://localhost:8000/api/stores/create", formDataToSend, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });  

      setMessage("Store created successfully!");
      setFormData({
        storeName: "",
        description: "",
        address: "",
        storePhone: "",
        storeEmail: "",
        storeWebsite: "",
        storeThumbnail: null,
      });
      setPreview(null);
    } catch (error) {
      console.error("Error creating store:", error);
      setMessage("Failed to create store. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full flex-col flex gap-4 max-w-lg py-4">
      <h2 className="text-3xl font-black text-center">Create Store</h2>

      <form
        onSubmit={handleSubmit}
        className="gap-4 w-full flex flex-col justify-center items-start bg-white shadow-2xl p-6"
      >
        <div className="w-full">
          <input
            type="text"
            name="storeName"
            placeholder="Store Name"
            value={formData.storeName}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="w-full">
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          ></textarea>
        </div>

        <div className="w-full">
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="w-full">
          <input
            type="text"
            name="storePhone"
            placeholder="Phone"
            value={formData.storePhone}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="w-full">
          <input
            type="email"
            name="storeEmail"
            placeholder="Email"
            value={formData.storeEmail}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="w-full">
          <input
            type="text"
            name="storeWebsite"
            placeholder="Website"
            value={formData.storeWebsite}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Drag & Drop Area */}
        <label htmlFor="storeThumbnail" className="w-full">
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="w-full object-cover rounded-md"
            />
          ) : (
            <div className="pl-4 text-gray-600 rounded-lg cursor-pointer border-dashed border-2 py-2 border-gray-300 hover:border-gray-600">
              Click to Upload or drag & drop
            </div>
          )}
        </label>
        <input
          type="file"
          name="storeThumbnail"
          id="storeThumbnail"
          onChange={handleChange}
          className="hidden w-full"
          accept="image/png, image/jpeg, image/jpg"
        />

        {preview && (
          <button
            type="button"
            onClick={handleRemoveImage}
            className="w-full bg-red-500 text-white px-4 py-2 rounded-lg"
          >
            Remove Image
          </button>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2 ${
            isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-red-600"
          } text-white font-semibold rounded-lg`}
        >
          {isSubmitting ? "Creating..." : "Create Store"}
        </button>

        {message && <p className="text-red-500 mt-2 text-center">{message}</p>}
      </form>
      <Link
        to="/admin/dashboard"
        className="text-center mx-auto bg-orange-500 text-white font-bold hover:bg-orange-700 rounded py-2 px-4"
      >
        Go Back
      </Link>
    </div>
  );
}
