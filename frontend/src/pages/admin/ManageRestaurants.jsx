import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { MdVisibility, MdEdit, MdMenu } from "react-icons/md";
import DeleteRestaurantButton from "../../components/DeleteRestaurantButton";
import { jwtDecode } from "jwt-decode";
import { useTranslation } from "react-i18next";

const ManageRestaurants = () => {
  const { i18n, t } = useTranslation();
  const currentLang = i18n.language || "en";

  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);

  const token = localStorage.getItem("token");
  const decoded = token ? jwtDecode(token) : null;
  const username = decoded?.username;

  const fetchRestaurants = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axiosInstance.get(
        `/restaurants/${username}?page=${page}&limit=${limit}&lang=${currentLang}`
      );
      setRestaurants(response.data.restaurants);
      setTotal(response.data.total);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load restaurants.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (username) fetchRestaurants();
  }, [username, page, limit, currentLang]);

  const handlePageChange = (newPage) => setPage(newPage);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-tomatoRose-700">Restaurants List</h2>
        <Link
          to="/admin/manage-restaurants/create-restaurant"
          className="bg-rose-600 text-white px-4 py-2 rounded hover:bg-tomatoRose-700 transition"
        >
          Create New
        </Link>
      </div>

      {error && <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4">{error}</div>}

      {loading ? (
        <div className="flex justify-center py-10">
          <div className="w-10 h-10 border-4 border-t-tomatoRose-600 border-gray-200 rounded-full animate-spin" />
        </div>
      ) : restaurants.length === 0 ? (
        <p className="text-gray-600">No restaurants found.</p>
      ) : (
        <>
          <div className="overflow-x-auto shadow-sm rounded-xl">
            <table className="min-w-full border text-sm text-left">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-3 font-semibold">#</th>
                  <th className="p-3 font-semibold">Logo</th>
                  <th className="p-3 font-semibold">Name</th>
                  <th className="p-3 font-semibold">Location</th>
                  <th className="p-3 font-semibold">Created On</th>
                  <th className="p-3 font-semibold">Menus</th>
                  <th className="p-3 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {restaurants.map((restaurant, index) => (
                  <tr key={restaurant._id} className="border-t hover:bg-gray-50">
                    <td className="p-3">{(page - 1) * limit + index + 1}</td>
                    <td className="p-3">
                      {restaurant.logo ? (
                        <img
                          src={restaurant.logo}
                          alt={restaurant.name?.[currentLang] || "Logo"}
                          className="w-12 h-12 object-cover rounded"
                        />
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td className="p-3">{restaurant.name?.[currentLang] || restaurant.name?.en || "Unknown"}</td>
                    <td className="p-3">{restaurant.location?.[currentLang] || restaurant.location?.en || "Unknown"}</td>
                    <td className="p-3">{new Date(restaurant.createdAt).toLocaleDateString()}</td>
                    <td className="p-3">
                      <Link
                        to={`/admin/manage-restaurants/${restaurant.restaurantSlug}/dishes`}
                        className="text-gray-600 hover:text-tomatoRose-600"
                        title="Menus"
                      >
                        <MdMenu size={20} />
                      </Link>
                    </td>
                    <td className="p-3 flex items-center gap-2">
                      <Link
                        to={`/${restaurant.restaurantSlug}`}
                        className="text-blue-500 hover:text-blue-700"
                        title="Preview"
                      >
                        <MdVisibility size={20} />
                      </Link>
                      <Link
                        to={`/admin/manage-restaurants/${restaurant.restaurantSlug}/update`}
                        className="text-yellow-500 hover:text-yellow-600"
                        title="Update"
                      >
                        <MdEdit size={20} />
                      </Link>
                      <DeleteRestaurantButton
                        restaurantId={restaurant._id}
                        onDeleteSuccess={fetchRestaurants}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {total > limit && (
            <div className="mt-6 flex justify-center">
              <ul className="flex gap-2">
                {Array.from({ length: Math.ceil(total / limit) }, (_, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handlePageChange(index + 1)}
                      className={`px-3 py-1 rounded border ${
                        page === index + 1
                          ? "bg-tomatoRose-600 text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ManageRestaurants;
