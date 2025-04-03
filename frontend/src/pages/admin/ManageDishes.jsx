import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { MdEdit, MdVisibility, MdDelete, MdAdd } from "react-icons/md";
import { jwtDecode } from "jwt-decode";

const ManageDishes = () => {
  const { restaurantSlug } = useParams();
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const username = decoded.username;

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
    if (restaurantSlug) {
      fetchDishes();
    }
  }, [restaurantSlug]);

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Manage Dishes</h2>
        <Link to={`/admin/manage-restaurants/${restaurantSlug}/create-dish`} className="btn btn-primary">
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
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead className="thead-dark">
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price ($)</th>
                <th>Calories</th>
                <th>Category</th>
                <th>Allergens</th>
                <th>Availability</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {dishes.map((dish) => (
                <tr key={dish._id}>
                  <td>
                    <div>
                      {dish.imageUrl ? (
                        <img
                          src={dish.imageUrl}
                          alt={dish.name}
                          style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "5px" }}
                        />
                      ) : (
                        "No Image"
                      )}
                    </div>
                  </td>
                  <td>{dish.name}</td>
                  <td>{dish.description || "N/A"}</td>
                  <td>{dish.price.toFixed(2)}</td>
                  <td>{dish.kilocalories || "N/A"}</td>
                  <td>{dish.category}</td>
                  <td>{dish.allergens?.length > 0 ? dish.allergens.join(", ") : "None"}</td>
                  <td>
                    {dish.availability?.startTime && dish.availability?.endTime
                      ? `${dish.availability.startTime} - ${dish.availability.endTime} min`
                      : "N/A"}
                  </td>
                  <td>{dish.isEnabled ? "Enabled" : "Disabled"}</td>
                  <td className="d-flex gap-2 h-100" style={{ borderRight:"1px solid #ddd", paddingBottom:"3.6rem" }}>
                    <Link
                      to={`/admin/${restaurantSlug}/${dish.dishSlug}/update-dish`}
                      className="btn btn-sm btn-warning"
                    >
                      <MdEdit />
                    </Link>
                    <button onClick={() => handleDelete(dish._id)} className="btn btn-sm btn-danger" disabled={loading}>
                      <MdDelete />
                    </button>
                    <Link
                      to={`/admin/manage-restaurants/${restaurantSlug}/${dish.dishSlug}/view-dish`}
                      className="btn btn-sm btn-info"
                    >
                      <MdVisibility />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageDishes;
