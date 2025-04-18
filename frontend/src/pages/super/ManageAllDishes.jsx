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
        console.log("Fetched dishes:", res.data.dishes);
        setDishes(res.data.dishes || []);
      } catch (err) {
        console.error("Error fetching dishes:", err);
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
      console.error("Delete failed:", err);
      alert("Could not delete dish.");
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="flex gap-4 items-center mb-6">
        <h2 className="text-3xl font-semibold">Manage All Dishes</h2>
      </div>

      {loading && (
        <div className="flex justify-center">
          <div className="animate-spin border-4 border-t-4 border-blue-600 rounded-full w-12 h-12"></div>
        </div>
      )}

      {error && <div className="alert alert-danger text-red-500">{error}</div>}

      {!loading && !error && dishes.length === 0 && (
        <div className="alert alert-info text-yellow-500">No dishes found.</div>
      )}

      {!loading && !error && dishes.length > 0 && (
        <div className="overflow-x-auto mt-6">
          <table className="min-w-full table-auto border-separate border-spacing-0.5">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="p-2 text-center">#</th>
                <th className="p-2 text-center">Name (EN)</th>
                <th className="p-2 text-center">Name (IT)</th>
                <th className="p-2 text-center">Name (AR)</th>
                <th className="p-2 text-center">Description (EN)</th>
                <th className="p-2 text-center">Description (IT)</th>
                <th className="p-2 text-center">Description (AR)</th>
                <th className="p-2 text-center">Slug</th>
                <th className="p-2 text-center">Price</th>
                <th className="p-2 text-center">Kilocalories</th>
                <th className="p-2 text-center">Category</th>
                <th className="p-2 text-center">Allergens</th>
                <th className="p-2 text-center">Availability</th>
                <th className="p-2 text-center">Status</th>
                <th className="p-2 text-center">Created By</th>
                <th className="p-2 text-center">Created At</th>
                <th className="p-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {dishes.map((dish, index) => (
                <tr key={dish._id} className="border-t">
                  <td className="p-2 text-center">{index + 1}</td>
                  <td className="p-2 text-center">{dish.name?.en || "-"}</td>
                  <td className="p-2 text-center">{dish.name?.it || "-"}</td>
                  <td className="p-2 text-center">{dish.name?.ar || "-"}</td>
                  <td className="p-2 text-center">{dish.description?.en || "-"}</td>
                  <td className="p-2 text-center">{dish.description?.it || "-"}</td>
                  <td className="p-2 text-center">{dish.description?.ar || "-"}</td>
                  <td className="p-2 text-center">{dish.dishSlug || "-"}</td>
                  <td className="p-2 text-center">{dish.price != null ? `$${dish.price.toFixed(2)}` : "-"}</td>
                  <td className="p-2 text-center">{dish.kilocalories != null ? dish.kilocalories : "-"}</td>
                  <td className="p-2 text-center">{dish.category || "-"}</td>
                  <td className="p-2 text-center">{dish.allergens?.join(", ") || "-"}</td>
                  <td className="p-2 text-center">
                    {dish.availability
                      ? `${dish.availability.startTime || "-"} - ${dish.availability.endTime || "-"}`
                      : "-"}
                  </td>
                  <td className="p-2 text-center">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-white ${dish.isEnabled ? "bg-green-500" : "bg-gray-500"}`}
                    >
                      {dish.isEnabled ? "Enabled" : "Disabled"}
                    </span>
                  </td>
                  <td className="p-2 text-center">{dish.createdBy || "-"}</td>
                  <td className="p-2 text-center">
                    {new Date(dish.createdAt).toLocaleString() || "-"}
                  </td>
                  <td className="p-2 text-center">
                    <div className="flex justify-center gap-2">
                      <Link to={`/dashboard/manage-dishes/${dish.dishSlug}`} className="btn btn-sm bg-yellow-500 text-white py-1 px-4 rounded-md">
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(dish.dishSlug)}
                        className="btn btn-sm bg-red-500 text-white py-1 px-4 rounded-md"
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
