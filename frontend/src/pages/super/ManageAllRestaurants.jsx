import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

const ManageAllRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const res = await axiosInstance.get("/restaurants");
        setRestaurants(res.data.restaurants || []);
      } catch (err) {
        setError("Failed to load restaurants.");
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  const handleDelete = async (slug) => {
    if (!window.confirm("Are you sure you want to delete this restaurant?")) return;
    try {
      await axiosInstance.delete(`/restaurants/${slug}`);
      setRestaurants((prev) => prev.filter((r) => r.restaurantSlug !== slug));
    } catch (err) {
      alert("Could not delete restaurant.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 mt-10">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Manage All Restaurants</h2>
        <Link
          to="/dashboard/manage-restaurants/add-restaurant"
          className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-md font-medium text-sm"
        >
          Add New Restaurant
        </Link>
      </div>

      {loading && (
        <div className="flex justify-center items-center py-10">
          <div className="w-12 h-12 border-4 border-t-4 border-gray-200 rounded-full animate-spin" />
        </div>
      )}

      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded shadow mb-4">{error}</div>
      )}

      {!loading && !error && restaurants.length === 0 && (
        <div className="bg-yellow-100 text-yellow-700 p-4 rounded shadow mb-4">
          No restaurants found.
        </div>
      )}

      {!loading && !error && restaurants.length > 0 && (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg border border-gray-200">
          <table className="min-w-full table-auto text-sm text-gray-700">
            <thead className="bg-gray-800 text-white">
              <tr>
                {[
                  "#", "Name", "Slug", "Location", "Languages", "Brand Colors",
                  "Logo", "Created By", "Created At", "Dishes Count", "Actions"
                ].map((head, idx) => (
                  <th key={idx} className="px-3 py-2 text-center font-semibold whitespace-nowrap">
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {restaurants.map((restaurant, index) => (
                <tr key={restaurant._id} className="border-t even:bg-gray-50">
                  <td className="px-3 py-2 text-center">{index + 1}</td>
                  <td className="px-3 py-2 text-center">{restaurant.name?.en || "-"}</td>
                  <td className="px-3 py-2 text-center">{restaurant.restaurantSlug || "-"}</td>
                  <td className="px-3 py-2 text-center">{restaurant.location?.en || "-"}</td>
                  <td className="px-3 py-2 text-center">
                    {restaurant.languages?.join(", ") || "-"}
                  </td>
                  <td className="px-3 py-2 text-center">
                    <div className="flex flex-wrap justify-center gap-1">
                      {restaurant.brandColors &&
                        Object.entries(restaurant.brandColors).map(([key, color]) => (
                          <span
                            key={key}
                            title={key}
                            className="w-4 h-4 rounded border border-gray-300"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                    </div>
                  </td>
                  <td className="px-3 py-2 text-center">
                    {restaurant.restaurantLogo ? (
                      <img
                        src={`data:image/jpeg;base64,${restaurant.restaurantLogo}`}
                        alt="Restaurant Logo"
                        className="w-12 h-12 object-cover mx-auto rounded shadow"
                      />
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="px-3 py-2 text-center">{restaurant.createdBy || "-"}</td>
                  <td className="px-3 py-2 text-center">
                    {new Date(restaurant.createdAt).toLocaleString()}
                  </td>
                  <td className="px-3 py-2 text-center">
                    {restaurant.dishes?.length || 0}
                  </td>
                  <td className="px-3 py-2 text-center">
                    <div className="flex flex-wrap justify-center gap-2">
                      <Link
                        to={`/dashboard/manage-restaurants/${restaurant.restaurantSlug}`}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white text-xs px-3 py-1 rounded"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(restaurant.restaurantSlug)}
                        className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                      <Link
                        to={`/dashboard/manage-dishes/${restaurant.restaurantSlug}/add-dish`}
                        className="bg-teal-500 hover:bg-teal-600 text-white text-xs px-3 py-1 rounded"
                      >
                        Add Dish
                      </Link>
                      <Link
                        to={`/dashboard/manage-dishes/${restaurant.restaurantSlug}`}
                        className="bg-teal-600 hover:bg-teal-700 text-white text-xs px-3 py-1 rounded"
                      >
                        View Dishes
                      </Link>
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
};

export default ManageAllRestaurants;
