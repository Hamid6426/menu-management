import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import axiosInstance from "../utils/axiosInstance";

const DeleteDishButton = ({ dishId, onDeleteSuccess }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    const confirmMessage = "Are you sure you want to delete this dish?";
    if (!window.confirm(confirmMessage)) return;

    try {
      setLoading(true);
      await axiosInstance.delete(`/dishes/${dishId}`);
      onDeleteSuccess?.(); // callback if passed
    } catch (err) {
      alert("Failed to delete the dish.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className="btn btn-sm btn-outline-danger"
      onClick={handleDelete}
      title="Delete this dish"
      disabled={loading}
    >
      <MdDelete />
    </button>
  );
};

export default DeleteDishButton;
