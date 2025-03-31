import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { MdEdit, MdAdd, MdVisibility, MdDelete } from "react-icons/md";

const GetMenus = () => {
  const { userId, restaurantId } = useParams();
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchMenus = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axiosInstance.get(`/menus/${restaurantId}/restaurant-menus`);
      setMenus(response.data.menus);
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching menus. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (menuId) => {
    if (window.confirm("Are you sure you want to delete this menu and its dishes?")) {
      try {
        setLoading(true);
        await axiosInstance.delete(`/menus/${menuId}`);
        fetchMenus(); // refresh the list after deletion
      } catch (err) {
        alert(err.response?.data?.message || "Error deleting menu. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (restaurantId) {
      fetchMenus();
    }
  }, [restaurantId]);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Menus</h2>
        <Link
          to={`/dashboard/${userId}/${restaurantId}/create-menu`}
          className="btn btn-primary mb-3"
        >
          Create New Menu
        </Link>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary"></div>
        </div>
      ) : menus.length === 0 ? (
        <div className="alert alert-info">No menus found.</div>
      ) : (
        menus.map((menu) => (
          <div key={menu._id} className="border rounded p-3 mb-3">
            <div className="row">
              <div className="col-md-12">
                <h5>{menu.name}</h5>
                <p className="mb-0">
                  <strong>Category:</strong> {menu.category}
                </p>
                {menu.description && <p className="mb-0">{menu.description}</p>}
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-12 text-end">
                <Link
                  to={`/dashboard/${userId}/${restaurantId}/${menu._id}/update-menu`}
                  className="btn btn-sm btn-outline-warning me-2"
                  title="Update Menu"
                >
                  <MdEdit /> Update Menu
                </Link>
                <button
                  onClick={() => handleDelete(menu._id)}
                  className="btn btn-sm btn-outline-danger me-2"
                  title="Delete Menu"
                  disabled={loading}
                >
                  <MdDelete /> Delete Menu
                </button>
                <Link
                  to={`/dashboard/${userId}/${restaurantId}/${menu._id}/create-dish`}
                  className="btn btn-sm btn-outline-primary me-2"
                  title="Add Dish"
                >
                  <MdAdd /> Add Dish
                </Link>
                <Link
                  to={`/dashboard/${userId}/${restaurantId}/${menu._id}/dishes`}
                  className="btn btn-sm btn-outline-info"
                  title="Show Dishes"
                >
                  <MdVisibility /> Show Dishes
                </Link>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default GetMenus;
