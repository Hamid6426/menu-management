import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateRestaurant = () => {
  const { restaurantId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    logo: "",
    brandColors: "",
    languages: [],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchRestaurant = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/restaurants/${restaurantId}`);
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Failed to fetch restaurant");

        setFormData({
          name: data.restaurant.name,
          location: data.restaurant.location || "",
          logo: data.restaurant.logo || "",
          brandColors: data.restaurant.brandColors || "",
          languages: data.restaurant.languages || [],
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (restaurantId) fetchRestaurant();
  }, [restaurantId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLanguagesChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      languages: e.target.value.split(",").map((lang) => lang.trim()),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const response = await fetch(`/api/restaurants/${restaurantId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to update restaurant");

      setSuccess("Restaurant updated successfully!");
      setTimeout(() => navigate(`/restaurant/${restaurantId}`), 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-6 text-tomatoRose-700">Update Restaurant</h2>

      {error && (
        <div className="mb-4 p-3 rounded bg-red-100 text-red-700 border border-red-300">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 rounded bg-green-100 text-green-700 border border-green-300">
          {success}
        </div>
      )}

      {loading && (
        <div className="flex justify-center py-4">
          <div className="w-8 h-8 border-4 border-t-tomatoRose-600 border-gray-200 rounded-full animate-spin"></div>
        </div>
      )}

      {!loading && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Restaurant Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-tomatoRose-400"
              placeholder="Restaurant Name"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-tomatoRose-400"
              placeholder="Location"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Logo URL</label>
            <input
              type="text"
              name="logo"
              value={formData.logo}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-tomatoRose-400"
              placeholder="Logo URL"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Brand Colors</label>
            <input
              type="text"
              name="brandColors"
              value={formData.brandColors}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-tomatoRose-400"
              placeholder="Brand Colors"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block mb-1 font-medium">Languages</label>
            <input
              type="text"
              name="languages"
              value={formData.languages.join(", ")}
              onChange={handleLanguagesChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-tomatoRose-400"
              placeholder="Languages (comma separated)"
              required
            />
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-tomatoRose-600 text-white py-2 px-4 rounded hover:bg-tomatoRose-700 transition"
            >
              {loading ? "Updating..." : "Update Restaurant"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default UpdateRestaurant;
