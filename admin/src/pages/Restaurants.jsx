import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';

export default function Restaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const limit = 10; // Number of restaurants per page

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axiosInstance.get('/restaurants', {
          params: { page, limit },
        });
        setRestaurants(response.data.restaurants);
      } catch (err) {
        console.error('Error fetching restaurants:', err);
        setError('Failed to fetch restaurants');
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, [page]);

  if (loading) return <div className="text-center mt-4">Loading restaurants...</div>;
  if (error) return <div className="alert alert-danger text-center">{error}</div>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Restaurants</h2>

      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Slug</th>
              <th>Location</th>
              <th>Languages</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {restaurants.map((restaurant) => (
              <tr key={restaurant._id}>
                <td>{restaurant.name}</td>
                <td>{restaurant.slug}</td>
                <td>{restaurant.location || 'N/A'}</td>
                <td>{restaurant.languages.join(', ')}</td>
                <td>{new Date(restaurant.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="d-flex justify-content-center mt-4">
        <button 
          className="btn btn-primary me-2" 
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span className="align-self-center">Page {page}</span>
        <button 
          className="btn btn-primary ms-2" 
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
