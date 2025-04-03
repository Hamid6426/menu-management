import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const ShowRestaurant = () => {
  const { restaurantSlug } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Convert ArrayBuffer to Base64
  const arrayBufferToBase64 = (buffer) => {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    bytes.forEach((byte) => (binary += String.fromCharCode(byte)));
    return `data:image/webp;base64,${window.btoa(binary)}`;
  };

  useEffect(() => {
    const fetchRestaurant = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await axiosInstance.get(`/restaurants/${restaurantSlug}/get`);
        let restaurantData = response.data?.restaurant || null;

        // Convert restaurantLogo if available
        if (restaurantData?.restaurantLogo?.data) {
          restaurantData.logoUrl = arrayBufferToBase64(restaurantData.restaurantLogo.data);
        } else {
          restaurantData.logoUrl = "/default-logo.jpg"; // Fallback image
        }

        setRestaurant(restaurantData);
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching restaurant details.");
      } finally {
        setLoading(false);
      }
    };

    if (restaurantSlug) fetchRestaurant();
  }, [restaurantSlug]);

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

  if (!restaurant) {
    return <div className="container my-5">No restaurant found</div>;
  }

  return (
    <div className="restaurant-page">
      {/* Hero Section */}
      <div
        className="restaurant-hero"
        style={{
          background: `url(${restaurant.logoUrl}) center/cover no-repeat`,
        }}
      >
        <div className="overlay">
          <h1>{restaurant.name}</h1>
          <p>{restaurant.location || "Location not available"}</p>
        </div>
      </div>

      {/* Restaurant Details */}
      <div className="container-fluid my-3">
        <div className="restaurant-details text-center">
          <h2 className="mb-3">{restaurant.name}</h2>
          <p><strong>Location:</strong> {restaurant.location || "N/A"}</p>

          {restaurant.brandColors && (
            <div className="mb-3">
              <strong>Brand Colors:</strong>
              <div className="d-flex justify-content-center mt-2">
                {restaurant.brandColors?.primary && (
                  <span className="color-badge me-2" style={{ backgroundColor: restaurant.brandColors.primary }}>
                    Primary
                  </span>
                )}
                {restaurant.brandColors?.secondary && (
                  <span className="color-badge me-2" style={{ backgroundColor: restaurant.brandColors.secondary }}>
                    Secondary
                  </span>
                )}
                {restaurant.brandColors?.tertiary && (
                  <span className="color-badge" style={{ backgroundColor: restaurant.brandColors.tertiary }}>
                    Tertiary
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* View Menu Button */}
        {restaurant.menus?.length > 0 && (
          <div className="text-center mt-4">
            <Link to={`/${restaurantSlug}/menu`} className="btn btn-success">
              View Menu
            </Link>
          </div>
        )}
      </div>

      {/* Page-Specific Styling */}
      <style>{`
        .restaurant-hero {
          position: relative;
          width: 100%;
          height: 400px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: white;
        }
        .restaurant-hero .overlay {
          position: absolute;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .restaurant-details {
          max-width: 600px;
          margin: auto;
        }
        .color-badge {
          display: inline-block;
          padding: 0.5rem 1rem;
          border-radius: 5px;
          color: white;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

export default ShowRestaurant;
