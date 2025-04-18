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
        imageUrl: dish.dishImage?.data ? arrayBufferToBase64(dish.dishImage.data) : null,
      }));
      setDishes(formattedDishes);
      setFilteredDishes(formattedDishes);

      const uniqueCategories = [t("showRestaurantMenu.all"), ...new Set(formattedDishes.map((dish) => dish.category))];
      setCategories(uniqueCategories);

      const allergensSet = new Set();
      formattedDishes.forEach((dish) => {
        dish.allergens?.forEach((a) => allergensSet.add(a));
      });
      setAvailableAllergens(Array.from(allergensSet));
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching dishes. Please try again.");
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
        `${dish.name} ${dish.description}`.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedAllergens.length > 0) {
      filtered = filtered.filter(
        (dish) => !dish.allergens || !dish.allergens.some((a) => selectedAllergens.includes(a))
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
    <div className="px-4 sm:px-6 lg:px-10 py-6">
      {error && (
        <div className="bg-red-100 text-red-800 px-4 py-2 rounded-md mb-4">
          {error}
        </div>
      )}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-end mb-6">
        {/* SearchBar component integration */}
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <AllergyFilter
          availableAllergens={availableAllergens}
          selectedAllergens={selectedAllergens}
          setSelectedAllergens={setSelectedAllergens}
        />
      </div>

      {loading ? (
        <div className="flex justify-center mt-10">
          <div className="w-8 h-8 border-4 border-t-primary border-gray-300 rounded-full animate-spin"></div>
        </div>
      ) : filteredDishes.length === 0 ? (
        <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-md text-center">
          {t("showRestaurantMenu.noDishesFound")}
        </div>
      ) : (
        Object.entries(groupedDishes).map(([category, dishesInCategory]) => (
          <div key={category} className="mb-10">
            <h2 className="text-xl sm:text-2xl font-semibold italic text-tomatoRose-700 mb-4">
              {t(`categories.${category}`, category)}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {dishesInCategory.map((dish) => (
                <div key={dish._id} className="bg-white rounded-xl shadow p-4">
                  <img
                    src={dish.imageUrl || "https://picsum.photos/id/312/1024/512"}
                    alt={dish.name}
                    className="w-full h-48 object-cover rounded-md"
                  />
                  <div className="mt-3 flex justify-between text-sm font-bold text-gray-700">
                    <span>{dish.name}</span>
                    <span>${dish.price.toFixed(2)}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {dish.description || t("showRestaurantMenu.noDescription")}
                  </p>
                  <p className="text-xs font-semibold text-tomatoRose-600 mt-2">
                    {dish.kilocalories} {t("showRestaurantMenu.kcal")}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {dish.allergens && dish.allergens.length > 0 ? (
                      dish.allergens.map((allergen, index) => (
                        <span key={index} className="text-xs bg-yellow-300 text-black px-2 py-1 rounded-full">
                          {t(`allergens.${allergen}`)}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full">
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
