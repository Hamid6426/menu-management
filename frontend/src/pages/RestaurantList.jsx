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
  const { t } = useTranslation();
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  const fetchRestaurants = async () => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.get("/restaurants", {
        params: { page, limit },
      });
      setRestaurants(data.restaurants.slice(0, 9)); // Ensures exactly 9 displayed

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
    let filtered = restaurants; // Initialize with the full list of restaurants
    if (searchQuery) {
      filtered = filtered.filter(
        (restaurant) =>
          restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          restaurant.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          restaurant.languages.some((lang) => lang.toLowerCase().includes(searchQuery.toLowerCase())) ||
          restaurant.createdBy.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredRestaurants(filtered); // Update the state with the filtered results
  };

  useEffect(() => {
    filterRestaurants();
  }, [searchQuery, restaurants]); // Trigger filter on searchQuery or restaurants change

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4" style={{ color: "#ff6600", fontFamily: "'Lobster', cursive" }}>
        Restaurants
      </h1>

      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        placeholder={t("showRestaurants.searchPlaceholder")}
      />

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : error ? (
        <div className="alert alert-danger text-center">{error}</div>
      ) : (
        <>
          <div className="row">
            {(filteredRestaurants.length > 0 ? filteredRestaurants : restaurants).map((restaurant) => (
              <div key={restaurant._id} className="col-lg-4 mb-4">
                <div className="card h-100 shadow-sm">
                  <div className="card-body d-flex flex-column justify-content-between">
                    <div>
                      <h5 className="card-title" style={{ color: "#ff6600" }}>
                        {restaurant.name}
                      </h5>
                      <p className="card-text mb-1 text-muted">
                        <strong>Location:</strong> {restaurant.location}
                      </p>

                      <p className="card-text mb-1">
                        <strong>Languages:</strong>{" "}
                        {Array.isArray(restaurant.languages) ? restaurant.languages.join(", ").toUpperCase() : "N/A"}
                      </p>
                      <p className="card-text mb-1">
                        <strong>Created By:</strong> {restaurant.createdBy}
                      </p>

                      {/* Brand color preview */}
                      {restaurant.brandColors && (
                        <div className="d-flex gap-2 align-items-center mb-2">
                          <strong className="me-1">Brand Colors:</strong>
                          {["primary", "secondary", "tertiary"].map((colorKey) => {
                            const color = restaurant.brandColors?.[colorKey];
                            return (
                              color && (
                                <div
                                  key={colorKey}
                                  title={colorKey}
                                  style={{
                                    width: "20px",
                                    height: "20px",
                                    backgroundColor: color,
                                    border: "1px solid #ccc",
                                  }}
                                />
                              )
                            );
                          })}
                        </div>
                      )}
                    </div>

                    {/* Optional CTA */}
                    <button className="btn btn-sm mt-auto" style={{ backgroundColor: "#ff6600", color: "#fff" }}>
                      <Link
                        to={`/${restaurant.restaurantSlug}/menu`} // Use the restaurant's slug in the route
                        style={{ color: "#fff", textDecoration: "none" }} // Make sure the link text stays white and doesn't have an underline
                      >
                        View Menu
                      </Link>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <nav aria-label="Page navigation">
            <ul className="pagination justify-content-center">
              <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                <button className="page-link" onClick={() => setPage(page - 1)}>
                  Previous
                </button>
              </li>

              {Array.from({ length: totalPages }, (_, i) => (
                <li key={i + 1} className={`page-item ${page === i + 1 ? "active" : ""}`}>
                  <button className="page-link" onClick={() => setPage(i + 1)}>
                    {i + 1}
                  </button>
                </li>
              ))}

              <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
                <button className="page-link" onClick={() => setPage(page + 1)}>
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </>
      )}
    </div>
  );
};

export default RestaurantList;
