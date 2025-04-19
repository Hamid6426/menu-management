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
      <div className="relative h-[400px] w-full overflow-hidden bg-white text-white">
        <img
          src={`data:image/png;base64,${restaurant.restaurantLogo}`}
          alt="Restaurant Logo"
          className="mx-auto h-full"
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 px-4">
          <h1 className="text-3xl font-bold md:text-5xl">{restaurant.name}</h1>
        </div>
      </div>

      {/* Restaurant Details */}
      <div className="mx-auto text-lg max-w-3xl px-4 py-8 text-center">
        <p className="text-gray-900 font-bold">Location</p>
        <p className="text-gray-700">"{restaurant.location || "N/A"}"</p>

        {restaurant.brandColors && (
          <div className="mt-5">
            <strong className="text-gray-900">Brand Colors:</strong>
            <div className="mt-2 flex justify-center gap-3 font-semibold">
              {restaurant.brandColors?.primary && (
                <div className="flex flex-col items-center gap-3">
                  <div
                    className="rounded-md border border-black px-5 py-5"
                    style={{ backgroundColor: restaurant.brandColors.primary }}
                  ></div>
                  <div>Primary</div>
                </div>
              )}
              {restaurant.brandColors?.secondary && (
                <div className="flex flex-col items-center gap-3">
                  <div
                    className="rounded-md border border-black px-5 py-5"
                    style={{
                      backgroundColor: restaurant.brandColors.secondary,
                    }}
                  ></div>
                  <div>Secondary</div>
                </div>
              )}
              {restaurant.brandColors?.tertiary && (
                <div className="flex flex-col items-center gap-3">
                  <div
                    className="rounded-md border border-black px-5 py-5"
                    style={{ backgroundColor: restaurant.brandColors.tertiary }}
                  ></div>
                  <div>Tertiary</div>
                </div>
              )}
            </div>
          </div>
        )}
        {/* View Menu Button */}
        <div className="mt-6">
          <Link
            to={restaurant.dishes?.length > 0 ? `/${restaurantSlug}/menu` : "#"}
            onClick={(e) => {
              if (!restaurant.dishes?.length) e.preventDefault(); // Prevent navigation
            }}
            className={`inline-block rounded-lg px-6 py-2 font-medium shadow transition ${
              restaurant.dishes?.length > 0
                ? "bg-green-600 text-white hover:bg-green-700"
                : "cursor-not-allowed bg-gray-400 text-white"
            }`}
          >
            View Menu
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ShowRestaurant;
