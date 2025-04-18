import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import AllergyFilter from "../components/AllergyFilter";
import { useTranslation } from "react-i18next";

const ShowRestaurantMenu = () => {
  const { restaurantSlug } = useParams();
  const [dishes, setDishes] = useState([]);
  const [filteredDishes, setFilteredDishes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAllergens, setSelectedAllergens] = useState([]);
  const [availableAllergens, setAvailableAllergens] = useState([]);

  const { t } = useTranslation();

  const arrayBufferToBase64 = (buffer) => {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    bytes.forEach((byte) => (binary += String.fromCharCode(byte)));
    return `data:image/webp;base64,${window.btoa(binary)}`;
  };

  const fetchDishes = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axiosInstance.get(`/dishes/${restaurantSlug}`);
      const formattedDishes = response.data.dishes.map((dish) => ({
        ...dish,
        imageUrl: dish.dishImage?.data
          ? arrayBufferToBase64(dish.dishImage.data)
          : null,
      }));
      setDishes(formattedDishes);
      setFilteredDishes(formattedDishes);

      const uniqueCategories = [
        t("showRestaurantMenu.all"),
        ...new Set(formattedDishes.map((dish) => dish.category)),
      ];
      setCategories(uniqueCategories);

      const allergensSet = new Set();
      formattedDishes.forEach((dish) => {
        dish.allergens?.forEach((a) => allergensSet.add(a));
      });
      setAvailableAllergens(Array.from(allergensSet));
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Error fetching dishes. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const filterDishes = () => {
    let filtered = [...dishes];

    if (selectedCategory !== t("showRestaurantMenu.all")) {
      filtered = filtered.filter((dish) => dish.category === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter((dish) =>
        `${dish.name} ${dish.description}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase()),
      );
    }

    if (selectedAllergens.length > 0) {
      filtered = filtered.filter(
        (dish) =>
          !dish.allergens ||
          !dish.allergens.some((a) => selectedAllergens.includes(a)),
      );
    }

    setFilteredDishes(filtered);
  };

  useEffect(() => {
    if (restaurantSlug) {
      fetchDishes();
    }
  }, [restaurantSlug]);

  useEffect(() => {
    filterDishes();
  }, [selectedCategory, searchQuery, selectedAllergens, dishes]);

  const groupedDishes = filteredDishes.reduce((acc, dish) => {
    if (!acc[dish.category]) acc[dish.category] = [];
    acc[dish.category].push(dish);
    return acc;
  }, {});

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-10">
      {error && (
        <div className="mb-4 rounded-md bg-red-100 px-4 py-2 text-red-800">
          {error}
        </div>
      )}

      <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full gap-4 md:gap-6">
        <div className="">
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </div>
        <div className="">
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>
        <div className="">
          <AllergyFilter
            availableAllergens={availableAllergens}
            selectedAllergens={selectedAllergens}
            setSelectedAllergens={setSelectedAllergens}
          />
        </div>
      </div>

      {loading ? (
        <div className="mt-10 flex justify-center">
          <div className="border-t-primary h-8 w-8 animate-spin rounded-full border-4 border-gray-300"></div>
        </div>
      ) : filteredDishes.length === 0 ? (
        <div className="rounded-md bg-blue-100 px-4 py-2 text-center text-blue-800">
          {t("showRestaurantMenu.noDishesFound")}
        </div>
      ) : (
        Object.entries(groupedDishes).map(([category, dishesInCategory]) => (
          <div key={category} className="mb-10">
            <h2 className="text-tomatoRose-700 mb-4 text-xl font-semibold italic sm:text-2xl">
              {t(`categories.${category}`, category)}
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {dishesInCategory.map((dish) => (
                <div key={dish._id} className="rounded-xl bg-white p-4 shadow">
                  <img
                    src={
                      dish.imageUrl || "https://picsum.photos/id/312/1024/512"
                    }
                    alt={dish.name}
                    className="h-48 w-full rounded-md object-cover"
                  />
                  <div className="mt-3 flex justify-between text-sm font-bold text-gray-700">
                    <span>{dish.name}</span>
                    <span>${dish.price.toFixed(2)}</span>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    {dish.description || t("showRestaurantMenu.noDescription")}
                  </p>
                  <p className="text-tomatoRose-600 mt-2 text-xs font-semibold">
                    {dish.kilocalories} {t("showRestaurantMenu.kcal")}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {dish.allergens && dish.allergens.length > 0 ? (
                      dish.allergens.map((allergen, index) => (
                        <span
                          key={index}
                          className="rounded-full bg-yellow-300 px-2 py-1 text-xs text-black"
                        >
                          {t(`allergens.${allergen}`)}
                        </span>
                      ))
                    ) : (
                      <span className="rounded-full bg-green-500 px-2 py-1 text-xs text-white">
                        {t("allergens.none")}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ShowRestaurantMenu;
