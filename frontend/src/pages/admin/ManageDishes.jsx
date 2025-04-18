import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { MdEdit, MdVisibility, MdDelete, MdAdd } from "react-icons/md";
import {jwtDecode} from "jwt-decode";
import { useTranslation } from "react-i18next";

const ManageDishes = () => {
  const { restaurantSlug } = useParams();
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { t } = useTranslation();

  const token = localStorage.getItem("token");
  const { username } = jwtDecode(token);

  const arrayBufferToBase64 = (buffer) => {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return `data:image/webp;base64,${window.btoa(binary)}`;
  };

  const fetchDishes = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await axiosInstance.get(`/dishes/${restaurantSlug}`);
      const formatted = data.dishes.map((d) => ({
        ...d,
        imageUrl: d.dishImage?.data
          ? arrayBufferToBase64(d.dishImage.data)
          : null,
      }));
      setDishes(formatted);
    } catch (err) {
      setError(
        err.response?.data?.message || t("Error fetching dishes.")
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm(t("Are you sure you want to delete this dish?"))) return;
    try {
      setLoading(true);
      await axiosInstance.delete(`/dishes/${id}`);
      fetchDishes();
    } catch (err) {
      alert(err.response?.data?.message || t("Error deleting dish."));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (restaurantSlug) fetchDishes();
  }, [restaurantSlug]);

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-2 sm:space-y-0">
        <h2 className="text-2xl font-semibold text-gray-800">
          {t("Manage Dishes")}
        </h2>
        <Link
          to={`/admin/${restaurantSlug}/create-dish`}
          className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-4 py-2 rounded"
        >
          <MdAdd className="mr-1" /> {t("Create New Dish")}
        </Link>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">
          {error}
        </div>
      )}

      {/* Loading */}
      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-gray-200" />
        </div>
      ) : dishes.length === 0 ? (
        <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">
          {t("No dishes found.")}
        </div>
      ) : (
        /* Table */
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {[
                  t("Image"),
                  t("Name"),
                  t("Description"),
                  t("Price ($)"),
                  t("Calories"),
                  t("Category"),
                  t("Allergens"),
                  t("Availability"),
                  t("Status"),
                  t("Actions"),
                ].map((heading) => (
                  <th
                    key={heading}
                    className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {dishes.map((dish) => (
                <tr key={dish._id}>
                  {/* Image */}
                  <td className="px-4 py-2 whitespace-nowrap">
                    {dish.imageUrl ? (
                      <img
                        src={dish.imageUrl}
                        alt={dish.name}
                        className="h-20 w-20 object-cover rounded"
                      />
                    ) : (
                      <span className="text-sm text-gray-500">
                        {t("No Image")}
                      </span>
                    )}
                  </td>

                  {/* Name */}
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                    {dish.name}
                  </td>

                  {/* Description */}
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">
                    {dish.description || t("N/A")}
                  </td>

                  {/* Price */}
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                    {dish.price.toFixed(2)}
                  </td>

                  {/* Calories */}
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">
                    {dish.kilocalories || t("N/A")}
                  </td>

                  {/* Category */}
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                    {t(`categories.${dish.category}`)}
                  </td>

                  {/* Allergens */}
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                    {dish.allergens?.length
                      ? dish.allergens
                          .map((a) => t(`allergens.${a}`))
                          .join(", ")
                      : t("None")}
                  </td>

                  {/* Availability */}
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">
                    {dish.availability?.startTime &&
                    dish.availability?.endTime
                      ? `${dish.availability.startTime} - ${dish.availability.endTime} min`
                      : t("N/A")}
                  </td>

                  {/* Status */}
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                    {dish.isEnabled ? t("Enabled") : t("Disabled")}
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-2 whitespace-nowrap flex items-center space-x-2">
                    <Link
                      to={`/admin/${restaurantSlug}/${dish.dishSlug}/update-dish`}
                      className="text-yellow-500 hover:text-yellow-700"
                    >
                      <MdEdit size={18} />
                    </Link>
                    <button
                      onClick={() => handleDelete(dish._id)}
                      disabled={loading}
                      className="text-red-500 hover:text-red-700"
                    >
                      <MdDelete size={18} />
                    </button>
                    <Link
                      to={`/admin/manage-restaurants/${restaurantSlug}/${dish.dishSlug}/view-dish`}
                      className="text-red-500 hover:text-red-700"
                    >
                      <MdVisibility size={18} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageDishes;
