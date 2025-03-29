import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const PreviewRestaurant = () => {
  const { restaurantId } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRestaurant = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await axiosInstance.get(`/restaurants/id/${restaurantId}`);
        setRestaurant(response.data.restaurant);
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching restaurant details.");
      } finally {
        setLoading(false);
      }
    };

    if (restaurantId) fetchRestaurant();
  }, [restaurantId]);

  if (loading) {
    return (
      <div className="container text-center my-5">
        <div className="spinner-border text-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container my-5">
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  if (!restaurant)
    return <div className="container my-5">No restaurant found</div>;

  return (
    <div className="container my-5">
      <div className="card shadow">
        {restaurant.logo && (
          <div
            className="card-img-top"
            style={{
              height: "400px",
              background: `url(${restaurant.logo}) center/cover no-repeat`,
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                bottom: 0,
                width: "100%",
                background: "rgba(0, 0, 0, 0.5)",
                color: "#fff",
                padding: "1rem",
              }}
            >
              <h2 className="mb-0">{restaurant.name}</h2>
            </div>
          </div>
        )}
        <div className="card-body">
          <div className="mb-3">
            <p className="card-text">
              <strong>Location:</strong> {restaurant.location}
            </p>
            <p className="card-text">
              <strong>Languages:</strong> {restaurant.languages.join(", ")}
            </p>
            {restaurant.brandColors && (
              <div className="mb-3">
                <strong>Brand Colors:</strong>
                <div className="d-flex mt-1">
                  {restaurant.brandColors.primary && (
                    <span
                      className="badge me-2"
                      style={{
                        backgroundColor: restaurant.brandColors.primary,
                        color: "#fff",
                        padding: "0.5rem 1rem",
                      }}
                    >
                      Primary
                    </span>
                  )}
                  {restaurant.brandColors.secondary && (
                    <span
                      className="badge me-2"
                      style={{
                        backgroundColor: restaurant.brandColors.secondary,
                        color: "#fff",
                        padding: "0.5rem 1rem",
                      }}
                    >
                      Secondary
                    </span>
                  )}
                  {restaurant.brandColors.tertiary && (
                    <span
                      className="badge"
                      style={{
                        backgroundColor: restaurant.brandColors.tertiary,
                        color: "#fff",
                        padding: "0.5rem 1rem",
                      }}
                    >
                      Tertiary
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
          <p className="card-text">
            <small className="text-muted">
              Created on {new Date(restaurant.createdAt).toLocaleDateString()}
            </small>
          </p>
          <div className="d-flex justify-content-end">
            <Link to="/dashboard" className="btn btn-outline-primary me-2">
              Back to Dashboard
            </Link>
            <Link
              to={`/dashboard/${restaurant._id}/update`}
              className="btn btn-primary me-2"
            >
              Edit Restaurant
            </Link>
            {restaurant.menus && restaurant.menus.length > 0 && (
              <Link
                to={`/menu/${restaurant.menus[0]}`}
                className="btn btn-success"
              >
                View Menu
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewRestaurant;
