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
        console.log("Fetched restaurants:", res.data.restaurants);
        setRestaurants(res.data.restaurants || []);
      } catch (err) {
        console.error("Error fetching restaurants:", err);
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
      console.error("Delete failed:", err);
      alert("Could not delete restaurant.");
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="flex gap-4 items-center mb-6">
        <h2 className="text-3xl font-semibold">Manage All Restaurants</h2>
        <Link to="/dashboard/manage-restaurants/add-restaurant" className="btn bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600">
          Add New Restaurant
        </Link>
      </div>

      {loading && (
        <div className="flex justify-center">
          <div className="animate-spin border-4 border-t-4 border-blue-600 rounded-full w-12 h-12"></div>
        </div>
      )}

      {error && <div className="alert alert-danger text-red-500">{error}</div>}

      {!loading && !error && restaurants.length === 0 && (
        <div className="alert alert-info text-yellow-500">No restaurants found.</div>
      )}

      {!loading && !error && restaurants.length > 0 && (
        <div className="overflow-x-auto mt-6">
          <table className="min-w-full table-auto border-separate border-spacing-0.5">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="p-2 text-center">#</th>
                <th className="p-2 text-center">Name</th>
                <th className="p-2 text-center">Slug</th>
                <th className="p-2 text-center">Location</th>
                <th className="p-2 text-center">Languages</th>
                <th className="p-2 text-center">Brand Colors</th>
                <th className="p-2 text-center">Logo</th>
                <th className="p-2 text-center">Created By</th>
                <th className="p-2 text-center">Created At</th>
                <th className="p-2 text-center">Dishes Count</th>
                <th className="p-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {restaurants.map((restaurant, index) => (
                <tr key={restaurant._id} className="border-t">
                  <td className="p-2 text-center">{index + 1}</td>
                  <td className="p-2 text-center">{restaurant.name?.en || "-"}</td>
                  <td className="p-2 text-center">{restaurant.restaurantSlug || "-"}</td>
                  <td className="p-2 text-center">{restaurant.location?.en || "-"}</td>
                  <td className="p-2 text-center">{restaurant.languages?.join(", ") || "-"}</td>
                  <td className="p-2">
                    <div className="flex gap-1 flex-wrap">
                      {restaurant.brandColors &&
                        Object.entries(restaurant.brandColors).map(([key, color]) => (
                          <span
                            key={key}
                            title={key}
                            style={{
                              display: "inline-block",
                              width: "16px",
                              height: "16px",
                              backgroundColor: color,
                              borderRadius: "3px",
                              border: "1px solid #ccc",
                            }}
                          />
                        ))}
                    </div>
                  </td>
                  <td className="p-2 text-center">
                    {restaurant.restaurantLogo ? (
                      <img
                        src={`data:image/jpeg;base64,${restaurant.restaurantLogo}`}
                        alt="Restaurant Logo"
                        className="w-12 h-12 object-cover"
                      />
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="p-2 text-center">{restaurant.createdBy || "-"}</td>
                  <td className="p-2 text-center">
                    {new Date(restaurant.createdAt).toLocaleString()}
                  </td>
                  <td className="p-2 text-center">{restaurant.dishes?.length || 0}</td>
                  <td className="p-2 text-center">
                    <div className="flex justify-center gap-2">
                      <Link
                        to={`/dashboard/manage-restaurants/${restaurant.restaurantSlug}`}
                        className="btn btn-sm bg-yellow-500 text-white py-1 px-4 rounded-md"
                      >
                        Edit Restaurant
                      </Link>
                      <button
                        onClick={() => handleDelete(restaurant.restaurantSlug)}
                        className="btn btn-sm bg-red-500 text-white py-1 px-4 rounded-md"
                      >
                        Delete Restaurant
                      </button>
                      <Link
                        to={`/dashboard/manage-dishes/${restaurant.restaurantSlug}/add-dish`}
                        className="btn btn-sm bg-teal-500 text-white py-1 px-4 rounded-md"
                      >
                        Add Dish
                      </Link>
                      <Link
                        to={`/dashboard/manage-dishes/${restaurant.restaurantSlug}`}
                        className="btn btn-sm bg-teal-500 text-white py-1 px-4 rounded-md"
                      >
                        Check Dishes
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
