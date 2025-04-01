import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { MdEdit, MdVisibility, MdDelete, MdAdd } from "react-icons/md";
import { jwtDecode } from "jwt-decode";

const ManageDishes = () => {
  const { restaurantSlug, menuSlug } = useParams();
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const username = decoded.username;

  const arrayBufferToBase64 = (buffer) => {
    const binary = new Uint8Array(buffer).reduce((acc, byte) => acc + String.fromCharCode(byte), "");
    return `data:image/jpeg;base64,${btoa(binary)}`;
  };

  const fetchDishes = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axiosInstance.get(`/dishes/${menuSlug}/list-menu-dishes`);
      const formattedDishes = response.data.dishes.map((dish) => ({
        ...dish,  
        imageUrl: dish.image ? arrayBufferToBase64(dish.image.data) : null,
      }));
      setDishes(formattedDishes);
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching dishes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (dishId) => {
    if (window.confirm("Are you sure you want to delete this dish?")) {
      try {
        setLoading(true);
        await axiosInstance.delete(`/dishes/${dishId}`);
        fetchDishes();
      } catch (err) {
        alert(err.response?.data?.message || "Error deleting dish. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (restaurantSlug && menuSlug) {
      fetchDishes();
    }
  }, [restaurantSlug, menuSlug]);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Dishes</h2>
        <Link
          to={`/${username}/manage-restaurants/${restaurantSlug}/${menuSlug}/create-dish`}
          className="btn btn-primary"
        >
          <MdAdd /> Create New Dish
        </Link>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary"></div>
        </div>
      ) : dishes.length === 0 ? (
        <div className="alert alert-info">No dishes found.</div>
      ) : (
        <div className="row">
          {dishes.map((dish) => (
            <div key={dish._id} className="col-md-6 col-lg-4 mb-4">
              <div className="card shadow-sm">
                {dish.imageUrl && (
                  <img src={dish.imageUrl} alt={dish.name} className="card-img-top" style={{ height: "200px", objectFit: "cover" }} />
                )}
                <div className="card-body">
                  <h5 className="card-title">{dish.name}</h5>
                  {dish.description && <p className="card-text">{dish.description}</p>}
                  <p className="mb-1"><strong>Price:</strong> ${dish.price}</p>
                  <p className="mb-2"><strong>Status:</strong> {dish.isEnabled ? "Enabled" : "Disabled"}</p>
                  
                  <div className="d-flex justify-content-between">
                    <Link to={`/${username}/${restaurantSlug}/${dish._id}/update-dish`} className="btn btn-sm btn-outline-warning">
                      <MdEdit /> Update
                    </Link>
                    <button
                      onClick={() => handleDelete(dish._id)}
                      className="btn btn-sm btn-outline-danger"
                      disabled={loading}
                    >
                      <MdDelete /> Delete
                    </button>
                    <Link to={`/${username}/manage-restaurants/${restaurantSlug}/${dish.dishSlug}/view-dish`} className="btn btn-sm btn-outline-info">
                      <MdVisibility /> View
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageDishes;
