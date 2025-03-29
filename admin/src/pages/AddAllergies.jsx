import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import "../../styles/AddAllergies.css";

const AddAllergies = () => {
  const [selectedAllergies, setSelectedAllergies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const allowedAllergies = [
    "gluten",
    "dairy",
    "nuts",
    "peanuts",
    "tree nuts",
    "shellfish",
    "soy",
    "eggs",
    "fish",
    "wheat",
    "sesame",
    "mustard",
    "celery",
    "lupin",
    "molluscs",
    "sulphites",
    "corn",
    "latex",
    "kiwi",
    "banana",
    "avocado",
    "crustaceans",
  ];

  // Fetch user profile & set allergies
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          alert("Session expired. Please log in again.");
          return navigate("/login");
        }

        const response = await axiosInstance.get("/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        // Initialize selected allergies from user profile (or empty array if none)
        setSelectedAllergies(response.data.user.allergies || []);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
        alert("Error fetching profile. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  // Handle checkbox changes
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedAllergies((prev) => [...prev, value]);
    } else {
      setSelectedAllergies((prev) =>
        prev.filter((allergy) => allergy !== value)
      );
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.put(
        "/users/profile/allergies",
        { allergies: selectedAllergies },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        alert("Allergies updated successfully!");
        navigate("/restaurants");
      } else {
        alert("Failed to update allergies. Please try again.");
      }
    } catch (error) {
      console.error("Error updating allergies:", error);
      alert("An error occurred. Please try again.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Update Your Allergies</h2>
      <form onSubmit={handleSubmit}>
        {allowedAllergies.map((allergy) => (
          <div key={allergy}>
            <label>
              <input
                type="checkbox"
                value={allergy}
                checked={selectedAllergies.includes(allergy)}
                onChange={handleCheckboxChange}
              />
              {allergy}
            </label>
          </div>
        ))}
        <button type="submit">Save Allergies</button>
        <button type="button" onClick={handleSkip}>
          Skip
        </button>
      </form>
    </div>
  );
};

export default AddAllergies;
