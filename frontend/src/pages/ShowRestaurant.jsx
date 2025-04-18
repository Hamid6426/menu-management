import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { useTranslation } from "react-i18next";

const ShowRestaurant = () => {
  const { restaurantSlug } = useParams();
  const { i18n } = useTranslation();
  const currentLang = i18n.language || "en"; // Use the global language from i18n

  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Convert ArrayBuffer to Base64 (if restaurantLogo is stored as binary data)
  const arrayBufferToBase64 = (buffer) => {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    bytes.forEach((byte) => (binary += String.fromCharCode(byte)));
    return `data:image/webp;base64,${window.btoa(binary)}`;
  };

  useEffect(() => {
    if (!restaurantSlug) return;

    setLoading(true);
    setError("");

    axiosInstance
      .get(`/restaurants/${restaurantSlug}/get?lang=${currentLang}`)
      .then((response) => {
        let restaurantData = response.data?.restaurant || null;

        // Convert restaurantLogo if available
        if (restaurantData?.restaurantLogo?.data) {
          restaurantData.logoUrl = arrayBufferToBase64(
            restaurantData.restaurantLogo.data,
          );
        } else {
          restaurantData.logoUrl = "/default-logo.jpg"; // Fallback image
        }

        setRestaurant(restaurantData);
      })
      .catch((err) => {
        setError(
          err.response?.data?.message || "Error fetching restaurant details.",
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, [restaurantSlug, currentLang]);

  if (loading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <div className="border-primary h-10 w-10 animate-spin rounded-full border-4 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto mt-10 max-w-xl">
        <div className="rounded-lg bg-red-100 p-4 text-red-700 shadow">
          {error}
        </div>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="mt-10 text-center text-gray-600">No restaurant found</div>
    );
  }

  return (
    <div className="restaurant-page">
      {/* Hero Section */}
      <div
        className="relative flex h-[400px] w-full items-center justify-center bg-cover bg-center text-center text-white"
        style={{ backgroundImage: `url(${restaurant.logoUrl})` }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 px-4">
          <h1 className="text-3xl font-bold md:text-5xl">{restaurant.name}</h1>
          <p className="mt-2 text-sm md:text-base">
            {restaurant.location || "Location not available"}
          </p>
        </div>
      </div>

      {/* Restaurant Details */}
      <div className="mx-auto max-w-3xl px-4 py-8 text-center">
        <h2 className="mb-3 text-2xl font-semibold">{restaurant.name}</h2>
        <p className="text-gray-700">
          <strong className="text-gray-900">Location:</strong>{" "}
          {restaurant.location || "N/A"}
        </p>

        {restaurant.brandColors && (
          <div className="mt-5">
            <strong className="text-gray-900">Brand Colors:</strong>
            <div className="mt-2 flex justify-center gap-3">
              {restaurant.brandColors?.primary && (
                <span
                  className="rounded-md px-4 py-2 font-semibold text-white"
                  style={{ backgroundColor: restaurant.brandColors.primary }}
                >
                  Primary
                </span>
              )}
              {restaurant.brandColors?.secondary && (
                <span
                  className="rounded-md px-4 py-2 font-semibold text-white"
                  style={{ backgroundColor: restaurant.brandColors.secondary }}
                >
                  Secondary
                </span>
              )}
              {restaurant.brandColors?.tertiary && (
                <span
                  className="rounded-md px-4 py-2 font-semibold text-white"
                  style={{ backgroundColor: restaurant.brandColors.tertiary }}
                >
                  Tertiary
                </span>
              )}
            </div>
          </div>
        )}

        {/* View Menu Button */}
        {restaurant.menus?.length > 0 && (
          <div className="mt-6">
            <Link
              to={`/${restaurantSlug}/menu`}
              className="inline-block rounded-lg bg-green-600 px-6 py-2 font-medium text-white shadow transition hover:bg-green-700"
            >
              View Menu
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowRestaurant;
