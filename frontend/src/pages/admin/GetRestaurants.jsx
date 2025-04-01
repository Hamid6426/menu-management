import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { MdVisibility, MdEdit, MdMenu } from "react-icons/md";
import DeleteRestaurantButton from "../../components/DeleteRestaurantButton";
import { jwtDecode } from "jwt-decode";

const GetRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);

  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const username = decoded?.username;

  const fetchRestaurants = async () => {
    setLoading(true);
    setError(null);

    try {

      // const response = await axiosInstance.get(`/restaurants/${username}?page=${page}&limit=${limit}`);
      const response = await axiosInstance.get(`/restaurants/${username}`);
      setRestaurants(response.data.restaurants);
      setTotal(response.data.total);
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching restaurants. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (username) fetchRestaurants();
  }, [username, page, limit]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Restaurants List</h2>
        <Link to={`/${username}/manage-restaurants/create-restaurant`} className="btn btn-primary">
          Create New
        </Link>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary"></div>
        </div>
      ) : (
        <>
          {restaurants.length === 0 ? (
            <p>No restaurants found.</p>
          ) : (
            <table className="table table-striped mt-4">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Logo</th>
                  <th>Name</th>
                  <th>Location</th>
                  <th>Created On</th>
                  <th>Menus</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {restaurants.map((restaurant, index) => (
                  <tr key={restaurant._id}>
                    <td>{(page - 1) * limit + index + 1}</td>
                    <td>
                      {restaurant.logo ? (
                        <img
                          src={restaurant.logo}
                          alt={restaurant.name}
                          style={{
                            width: "50px",
                            height: "50px",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td>{restaurant.name}</td>
                    <td>{restaurant.location}</td>
                    <td>{new Date(restaurant.createdAt).toLocaleDateString()}</td>
                    <td>
                      <Link
                        to={`/${username}/${restaurant.restaurantSlug}/menus`}
                        className="btn btn-sm btn-outline-secondary"
                        title="Menus"
                      >
                        <MdMenu />
                      </Link>
                    </td>
                    <td>
                      <Link to={`/${restaurant._id}`} className="btn btn-sm btn-outline-info me-1" title="Preview">
                        <MdVisibility />
                      </Link>
                      <Link
                        to={`/${username}/restaurants/${restaurant._id}/update`}
                        className="btn btn-sm btn-outline-warning me-1"
                        title="Update"
                      >
                        <MdEdit />
                      </Link>
                      <DeleteRestaurantButton restaurantId={restaurant._id} onDeleteSuccess={fetchRestaurants} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {total > limit && (
            <nav>
              <ul className="pagination">
                {Array.from({ length: Math.ceil(total / limit) }, (_, index) => (
                  <li key={index} className={`page-item ${page === index + 1 ? "active" : ""}`}>
                    <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                      {index + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </>
      )}
    </div>
  );
};

export default GetRestaurants;
