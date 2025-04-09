import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

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
    <div className="container-fluid mt-5">
      <div className="d-flex gap-4 align-items-center">
        <h2>Manage All Restaurants</h2>
        <Link to="/dashboard/manage-restaurants/add-restaurant" className="btn btn-primary">
          Add New Restaurant
        </Link>
      </div>

      {loading && (
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-primary" role="status" />
        </div>
      )}

      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && restaurants.length === 0 && <div className="alert alert-info">No restaurants found.</div>}

      {!loading && !error && restaurants.length > 0 && (
        <div className="table-responsive mt-3">
          <table className="table table-striped table-bordered align-middle">
            <thead className="table-dark text-nowrap">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Slug</th>
                <th>Location</th>
                <th>Languages</th>
                <th>Brand Colors</th>
                <th>Logo</th>
                <th>Created By</th>
                <th>Created At</th>
                <th>Dishes Count</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-nowrap">
              {restaurants.map((restaurant, index) => (
                <tr key={restaurant._id}>
                  <td>{index + 1}</td>
                  <td>{typeof restaurant.name === "object" ? restaurant.name.en || "-" : restaurant.name || "-"},</td>
                  <td>{restaurant.restaurantSlug || "-"}</td>
                  <td>
                    {typeof restaurant.location === "object"
                      ? restaurant.location.en || "-"
                      : restaurant.location || "-"}
                  </td>
                  <td>{restaurant.languages?.join(", ") || "-"}</td>
                  <td>
                    <div className="d-flex gap-1 flex-wrap">
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
                  <td>
                    {restaurant.restaurantLogo ? (
                      <img
                        src={`data:image/jpeg;base64,${restaurant.restaurantLogo}`}
                        alt="Restaurant Logo"
                        style={{ width: "50px", height: "50px", objectFit: "cover" }}
                      />
                    ) : (
                      "-"
                    )}
                  </td>
                  <td>{restaurant.createdBy || "-"}</td>
                  <td>{new Date(restaurant.createdAt).toLocaleString()}</td>
                  <td>{restaurant.dishes?.length || 0}</td>
                  <td className="text-center">
                    <div className="d-flex justify-content-center gap-2 flex-nowrap">
                      <Link
                        to={`/dashboard/manage-restaurants/${restaurant.restaurantSlug}`}
                        className="btn btn-sm btn-warning"
                      >
                        Edit Restaurant
                      </Link>
                      <button onClick={() => handleDelete(restaurant.restaurantSlug)} className="btn btn-sm btn-danger">
                        Delete Restaurant
                      </button>
                      <Link
                        to={`/dashboard/manage-dishes/${restaurant.restaurantSlug}/add-dish`}
                        className="btn btn-sm btn-info text-white"
                      >
                        Add Dish
                      </Link>
                      <Link
                        to={`/dashboard/manage-dishes/${restaurant.restaurantSlug}`}
                        className="btn btn-sm btn-info text-white"
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
