import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import AllergyFilter from "../components/AllergyFilter";

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

      // Extract categories from the dishes
      const uniqueCategories = ["All", ...new Set(formattedDishes.map((dish) => dish.category))];
      setCategories(uniqueCategories);

      // Extract unique allergens from all dishes
      const allergensSet = new Set();
      formattedDishes.forEach((dish) => {
        if (dish.allergens && dish.allergens.length > 0) {
          dish.allergens.forEach((allergen) => allergensSet.add(allergen));
        }
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

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter((dish) => dish.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (dish) =>
          dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          dish.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Exclude dishes that contain any of the selected allergens.
    if (selectedAllergens.length > 0) {
      filtered = filtered.filter(
        (dish) => !dish.allergens || !dish.allergens.some((allergen) => selectedAllergens.includes(allergen))
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

  // Group the filtered dishes by category
  const groupedDishes = filteredDishes.reduce((acc, dish) => {
    if (!acc[dish.category]) {
      acc[dish.category] = [];
    }
    acc[dish.category].push(dish);
    return acc;
  }, {});

  return (
    <div className="container-fluid">
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="mt-3 d-flex align-items-start gap-2">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
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
        <div className="text-center">
          <div className="spinner-border text-primary"></div>
        </div>
      ) : filteredDishes.length === 0 ? (
        <div className="alert alert-info">No dishes found.</div>
      ) : (
        Object.entries(groupedDishes).map(([category, dishesInCategory]) => (
          <div key={category} className="mb-3">
            <h2 className="fw-bold fst-italic my-3">{category}</h2>
            <div className="row row-cols-1 row-cols-md-4 g-4">
              {dishesInCategory.map((dish) => (
                <div className="col" key={dish._id}>
                  <div className="card">
                    <img
                      src={dish.imageUrl || "https://picsum.photos/id/312/1024/512"}
                      alt={dish.name}
                      className="card-img-top"
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                    <div className="card-body">
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="fw-bold">{dish.name}</div>
                        <div className="fw-bold">{dish.price.toFixed(2)}</div>
                      </div>
                      <div className="fw-light mt-1" style={{ fontSize: "0.8rem" }}>
                        {dish.description || "No description available"}
                      </div>
                      <div className="fw-bold mt-2" style={{ fontSize: "0.8rem" }}>
                        {dish.kilocalories} kcal
                      </div>
                      <div className="mt-2">
                        <div className="d-flex flex-row align-items-center flex-wrap gap-2">
                          {dish.allergens && dish.allergens.length > 1 ? (
                            dish.allergens.map((allergen, index) => (
                              <div key={index} className="badge bg-warning text-dark">
                                {allergen}
                              </div>
                            ))
                          ) : (
                            <li className="badge bg-success text-white">No Allergens</li>
                          )}
                        </div>
                      </div>
                    </div>
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
