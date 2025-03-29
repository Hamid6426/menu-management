import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const PreviewMenu = () => {
  const { menuId } = useParams();
  const [menu, setMenu] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMenu = async () => {
      setLoading(true);
      setError("");
      try {
        // Adjust the endpoint as needed to match your backend
        const response = await axiosInstance.get(`/menus/id/${menuId}`);
        setMenu(response.data.menu);
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching menu details.");
      } finally {
        setLoading(false);
      }
    };

    if (menuId) fetchMenu();
  }, [menuId]);

  if (loading) {
    return (
      <div className="container text-center my-5">
        <div className="spinner-border text-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container my-5">
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  if (!menu)
    return <div className="container my-5">No menu found</div>;

  return (
    <div className="container my-5">
      <div className="card shadow">
        {menu.banner && (
          <div
            className="card-img-top"
            style={{
              height: "300px",
              background: `url(${menu.banner}) center/cover no-repeat`,
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                bottom: 0,
                width: "100%",
                background: "rgba(0, 0, 0, 0.5)",
                color: "#fff",
                padding: "1rem",
              }}
            >
              <h2 className="mb-0">{menu.name}</h2>
            </div>
          </div>
        )}
        <div className="card-body">
          {menu.description && (
            <p className="card-text">
              <strong>Description:</strong> {menu.description}
            </p>
          )}
          {menu.items && menu.items.length > 0 && (
            <div className="mb-3">
              <h5>Menu Items</h5>
              <ul className="list-group">
                {menu.items.map((item) => (
                  <li
                    key={item._id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    {item.name}
                    <span className="badge bg-primary rounded-pill">
                      ${item.price}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <p className="card-text">
            <small className="text-muted">
              Created on {new Date(menu.createdAt).toLocaleDateString()}
            </small>
          </p>
          <div className="d-flex justify-content-end">
            <Link to="/dashboard" className="btn btn-outline-primary me-2">
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewMenu;
