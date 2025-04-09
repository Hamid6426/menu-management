import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

export default function GetAllDishes() {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const res = await axiosInstance.get("/dishes");
        console.log("Fetched dishes:", res.data.dishes);
        setDishes(res.data.dishes || []);
      } catch (err) {
        console.error("Error fetching dishes:", err);
        setError("Failed to load dishes.");
      } finally {
        setLoading(false);
      }
    };

    fetchDishes();
  }, []);

  const handleDelete = async (dishSlug) => {
    if (!window.confirm("Are you sure you want to delete this dish?")) return;
    try {
      await axiosInstance.delete(`/dishes/${dishSlug}`);
      setDishes((prev) => prev.filter((d) => d.dishSlug !== dishSlug));
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Could not delete dish.");
    }
  };

  return (
    <div className="container-fluid mt-5">
      <div className="d-flex gap-4 align-items-center">
        <h2>Manage All Dishes</h2>
      </div>

      {loading && (
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-primary" role="status" />
        </div>
      )}

      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && dishes.length === 0 && <div className="alert alert-info">No dishes found.</div>}

      {!loading && !error && dishes.length > 0 && (
        <div className="table-responsive mt-3">
          <table className="table table-striped table-bordered align-middle">
            <thead className="table-dark text-nowrap">
              <tr>
                <th>#</th>
                <th>Name (EN)</th>
                <th>Name (IT)</th>
                <th>Name (AR)</th>
                <th>Description (EN)</th>
                <th>Description (IT)</th>
                <th>Description  (AR)</th>
                <th>Slug</th>
                <th>Price</th>
                <th>Kilocalories</th>
                <th>Category</th>
                <th>Allergens</th>
                <th>Availability</th>
                <th>Status</th>
                <th>Created By</th>
                <th>Created At</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-nowrap">
              {dishes.map((dish, index) => (
                <tr key={dish._id}>
                  <td>{index + 1}</td>
                  <td>{typeof dish.name === "object" ? dish.name.en || "-" : dish.name || "-"}</td>
                  <td>{typeof dish.name === "object" ? dish.name.it || "-" : "-"}</td>
                  <td>{typeof dish.name === "object" ? dish.name.ar || "-" : "-"}</td>
                  <td>{typeof dish.description === "object" ? dish.description.en || "-" : dish.description || "-"}</td>
                  <td>{typeof dish.description === "object" ? dish.description.it || "-" : "-"}</td>
                  <td>{typeof dish.description === "object" ? dish.description.ar || "-" : "-"}</td>
                  <td>{dish.dishSlug || "-"}</td>
                  <td>{dish.price != null ? `$${dish.price.toFixed(2)}` : "-"}</td>
                  <td>{dish.kilocalories != null ? dish.kilocalories : "-"}</td>
                  <td>{dish.category || "-"}</td>
                  <td>{dish.allergens?.join(", ") || "-"}</td>
                  <td>
                    {dish.availability
                      ? `${dish.availability.startTime || "-"} - ${dish.availability.endTime || "-"}`
                      : "-"}
                  </td>
                  <td>
                    <span className={`badge ${dish.isEnabled ? "bg-success" : "bg-secondary"}`}>
                      {dish.isEnabled ? "Enabled" : "Disabled"}
                    </span>
                  </td>
                  <td>{dish.createdBy || "-"}</td>
                  <td>{new Date(dish.createdAt).toLocaleString()}</td>
                  <td className="text-center">
                    <div className="d-flex justify-content-center gap-2 flex-nowrap">
                      <Link to={`/dashboard/manage-dishes/${dish.dishSlug}`} className="btn btn-sm btn-warning">
                        Edit
                      </Link>
                      <button onClick={() => handleDelete(dish.dishSlug)} className="btn btn-sm btn-danger">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
