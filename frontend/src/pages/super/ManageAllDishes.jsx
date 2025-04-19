import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

export default function ManageAllDishes() {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const res = await axiosInstance.get("/dishes");
        setDishes(res.data.dishes || []);
      } catch (err) {
        setError("Failed to load dishes.");
      } finally {
        setLoading(false);
      }
    };
    fetchDishes();
  }, []);

  const handleDelete = async (dishSlug) => {
    if (!window.confirm("Are you sure you want to delete this dish?")) return;
    try {
      await axiosInstance.delete(`/dishes/${dishSlug}`);
      setDishes((prev) => prev.filter((d) => d.dishSlug !== dishSlug));
    } catch (err) {
      alert("Could not delete dish.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 mt-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Manage All Dishes</h2>
      </div>

      {loading && (
        <div className="flex justify-center items-center py-10">
          <div className="w-12 h-12 border-4 border-t-4 border-t-orange-500 border-gray-200 rounded-full animate-spin"></div>
        </div>
      )}

      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded shadow mb-4">
          {error}
        </div>
      )}

      {!loading && !error && dishes.length === 0 && (
        <div className="bg-yellow-100 text-yellow-700 p-4 rounded shadow mb-4">
          No dishes found.
        </div>
      )}

      {!loading && !error && dishes.length > 0 && (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg border border-gray-200">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-800 text-white text-sm">
              <tr>
                {[
                  "#", "EN", "IT", "AR", "Desc (EN)", "Desc (IT)", "Desc (AR)",
                  "Slug", "Price", "Kcal", "Category", "Allergens",
                  "Availability", "Status", "Created By", "Created At", "Actions"
                ].map((heading, idx) => (
                  <th key={idx} className="px-3 py-2 text-center font-semibold">{heading}</th>
                ))}
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700">
              {dishes.map((dish, index) => (
                <tr key={dish._id} className="even:bg-gray-50 border-t">
                  <td className="px-3 py-2 text-center">{index + 1}</td>
                  <td className="px-3 py-2 text-center">{dish.name?.en || "-"}</td>
                  <td className="px-3 py-2 text-center">{dish.name?.it || "-"}</td>
                  <td className="px-3 py-2 text-center">{dish.name?.ar || "-"}</td>
                  <td className="px-3 py-2 text-center">{dish.description?.en || "-"}</td>
                  <td className="px-3 py-2 text-center">{dish.description?.it || "-"}</td>
                  <td className="px-3 py-2 text-center">{dish.description?.ar || "-"}</td>
                  <td className="px-3 py-2 text-center">{dish.dishSlug || "-"}</td>
                  <td className="px-3 py-2 text-center">{dish.price != null ? `$${dish.price.toFixed(2)}` : "-"}</td>
                  <td className="px-3 py-2 text-center">{dish.kilocalories ?? "-"}</td>
                  <td className="px-3 py-2 text-center">{dish.category || "-"}</td>
                  <td className="px-3 py-2 text-center">{dish.allergens?.join(", ") || "-"}</td>
                  <td className="px-3 py-2 text-center">
                    {dish.availability
                      ? `${dish.availability.startTime || "-"} - ${dish.availability.endTime || "-"}`
                      : "-"}
                  </td>
                  <td className="px-3 py-2 text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${
                      dish.isEnabled ? "bg-green-500" : "bg-gray-500"
                    }`}>
                      {dish.isEnabled ? "Enabled" : "Disabled"}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-center">{dish.createdBy || "-"}</td>
                  <td className="px-3 py-2 text-center">
                    {new Date(dish.createdAt).toLocaleString()}
                  </td>
                  <td className="px-3 py-2 text-center">
                    <div className="flex justify-center gap-2">
                      <Link
                        to={`/dashboard/manage-dishes/${dish.dishSlug}`}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-xs font-medium"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(dish.dishSlug)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
