import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import SearchBar from "../components/SearchBar";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const { t } = useTranslation();

  const fetchRestaurants = async () => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.get("/restaurants", {
        params: { page, limit },
      });
      setRestaurants(data.restaurants.slice(0, 9));
      setTotal(data.total);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to fetch restaurants.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, [page]);

  const filterRestaurants = () => {
    let filtered = restaurants;
    if (searchQuery) {
      filtered = filtered.filter(
        (restaurant) =>
          restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          restaurant.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          restaurant.languages.some((lang) =>
            lang.toLowerCase().includes(searchQuery.toLowerCase())
          ) ||
          restaurant.createdBy.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredRestaurants(filtered);
  };

  useEffect(() => {
    filterRestaurants();
  }, [searchQuery, restaurants]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-4xl font-bold text-red-600 text-center mb-6 font-lobster">
        Restaurants
      </h1>

      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        placeholder={t("showRestaurants.searchPlaceholder")}
      />

      {loading ? (
        <p className="text-center mt-8 text-gray-500">Loading...</p>
      ) : error ? (
        <div className="text-red-600 bg-red-100 p-4 rounded mt-4 text-center">{error}</div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {(filteredRestaurants.length > 0 ? filteredRestaurants : restaurants).map((restaurant) => (
              <div
                key={restaurant._id}
                className="bg-white shadow-md rounded-xl p-5 flex flex-col justify-between"
              >
                <div>
                  <h5 className="text-xl font-semibold text-red-600 mb-2">{restaurant.name}</h5>
                  <p className="text-gray-600 text-sm mb-1">
                    <span className="font-medium">Location:</span> {restaurant.location}
                  </p>
                  <p className="text-gray-600 text-sm mb-1">
                    <span className="font-medium">Languages:</span>{" "}
                    {Array.isArray(restaurant.languages)
                      ? restaurant.languages.join(", ").toUpperCase()
                      : "N/A"}
                  </p>
                  <p className="text-gray-600 text-sm mb-3">
                    <span className="font-medium">Created By:</span> {restaurant.createdBy}
                  </p>

              
                </div>

                <Link
                  to={`/${restaurant.restaurantSlug}/menu`}
                  className="mt-4 inline-block text-center bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
                >
                  View Menu
                </Link>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8">
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="px-4 py-2 text-sm rounded border border-gray-300 bg-white hover:bg-gray-100 disabled:opacity-50"
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setPage(i + 1)}
                  className={`px-4 py-2 text-sm rounded border ${
                    page === i + 1
                      ? "bg-red-600 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages}
                className="px-4 py-2 text-sm rounded border border-gray-300 bg-white hover:bg-gray-100 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default RestaurantList;
