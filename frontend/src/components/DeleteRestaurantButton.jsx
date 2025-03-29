import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import axiosInstance from "../utils/axiosInstance";

const DeleteRestaurantButton = ({ restaurantId, onDeleteSuccess }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this restaurant?")) {
      try {
        setLoading(true);
        await axiosInstance.delete(`/restaurants/${restaurantId}`);
        if (onDeleteSuccess) {
          onDeleteSuccess(); // callback to refresh the list
        }
      } catch (err) {
        alert(
          err.response?.data?.message ||
            "Error deleting restaurant. Please try again."
        );
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="btn btn-sm btn-outline-danger"
      title="Delete"
      disabled={loading}
    >
      <MdDelete />
    </button>
  );
};

export default DeleteRestaurantButton;
