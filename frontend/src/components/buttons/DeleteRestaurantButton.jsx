import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import axiosInstance from "../../../../super/src/utils/axiosInstance";

const DeleteRestaurantButton = ({ restaurantId, onDeleteSuccess }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    const confirmationMessage = "Are you sure you want to delete this restaurant?";
    
    if (window.confirm(confirmationMessage)) {
      try {
        setLoading(true);
        await axiosInstance.delete(`/restaurants/${restaurantId}`);
        if (onDeleteSuccess) {
          onDeleteSuccess();
        }
      } catch (err) {
        alert("Something went wrong while deleting the restaurant.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="btn btn-sm btn-outline-danger"
      title="Delete this restaurant"
      disabled={loading}
    >
      <MdDelete />
    </button>
  );
};

export default DeleteRestaurantButton;
