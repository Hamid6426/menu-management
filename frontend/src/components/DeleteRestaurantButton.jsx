import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import axiosInstance from "../utils/axiosInstance";
import { useTranslation } from "react-i18next";

const DeleteRestaurantButton = ({ restaurantId, onDeleteSuccess }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    const confirmationMessage = t('deleteRestaurantButton.confirmDelete');
    
    if (window.confirm(confirmationMessage)) {
      try {
        setLoading(true);
        await axiosInstance.delete(`/restaurants/${restaurantId}`);
        if (onDeleteSuccess) {
          onDeleteSuccess(); // callback to refresh the list
        }
      } catch (err) {
        const errorMessage = t('deleteRestaurantButton.errorMessage');
        alert(errorMessage);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="btn btn-sm btn-outline-danger"
      title={t('deleteRestaurantButton.confirmDelete')}
      disabled={loading}
    >
      <MdDelete />
    </button>
  );
};

export default DeleteRestaurantButton;
