import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import axiosInstance from "../utils/axiosInstance";
import { useTranslation } from "react-i18next";

const DeleteRestaurantButton = ({ restaurantId, onDeleteSuccess }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    const confirmationMessage = t("deleteRestaurantButton.confirmDelete");

    if (window.confirm(confirmationMessage)) {
      try {
        setLoading(true);
        await axiosInstance.delete(`/restaurants/${restaurantId}`);
        if (onDeleteSuccess) {
          onDeleteSuccess(); // callback to refresh the list
        }
      } catch (err) {
        const errorMessage = t("deleteRestaurantButton.errorMessage");
        alert(errorMessage);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="focus:ring-opacity-50 rounded-md border border-red-600 px-2 py-1 text-sm text-red-600 hover:bg-red-600 hover:text-white focus:ring-2 focus:ring-red-600 focus:outline-none disabled:opacity-50"
      title={t("deleteRestaurantButton.confirmDelete")}
      disabled={loading}
    >
      <MdDelete />
    </button>
  );
};

export default DeleteRestaurantButton;
