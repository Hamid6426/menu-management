import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import axiosInstance from "../../../../super/src/utils/axiosInstance";

const DeleteUserButton = ({ userId, onDeleteSuccess }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    const confirmMessage = "Are you sure you want to delete this user?";
    if (!window.confirm(confirmMessage)) return;

    try {
      setLoading(true);
      await axiosInstance.delete(`/users/${userId}`);
      onDeleteSuccess?.(); // optional chaining
    } catch (err) {
      alert("Failed to delete the user.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className="btn btn-sm btn-outline-danger"
      onClick={handleDelete}
      title="Delete this user"
      disabled={loading}
    >
      <MdDelete />
    </button>
  );
};

export default DeleteUserButton;
