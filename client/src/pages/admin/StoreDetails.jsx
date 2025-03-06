import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axiosInstance from "../../utils/axiosConfig";

export default function StoreDetail() {
  const { id } = useParams(); // Get store ID from URL
  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStore = async () => {
      try {
        const response = await axiosInstance.get(`/stores/${id}`);
        setStore(response.data);
      } catch (err) {
        setError("Failed to load store details.");
      } finally {
        setLoading(false);
      }
    };

    fetchStore();
  }, [id]);

  if (loading) return <p className="text-center mt-6">Loading store details...</p>;
  if (error) return <p className="text-center text-red-600 mt-6">{error}</p>;

  // Convert Buffer to Base64 if image exists
  let imageSrc = "";
  if (store?.storeThumbnail?.data) {
    const base64String = btoa(
      new Uint8Array(store.storeThumbnail.data).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        ""
      )
    );
    imageSrc = `data:image/jpeg;base64,${base64String}`;
  }

  return (
    <div className="w-full min-h-screen px-6 py-6">
      <h2 className="text-3xl font-black text-center mb-6">{store.storeName}</h2>

      <div className="max-w-2xl mx-auto bg-white shadow-xl border-gray-400 border-2 rounded-lg p-6">
        {imageSrc && (
          <img src={imageSrc} alt={store.storeName} className="w-full rounded-lg object-cover mb-4" />
        )}

        <p className="text-gray-600 mb-4">{store.description}</p>

        <div className="grid grid-cols-12 gap-4 mb-4">
          <strong className="col-span-3">Address:</strong>
          <p className="col-span-9">{store.address}</p>

          <strong className="col-span-3">Phone:</strong>
          <p className="col-span-9">{store.storePhone}</p>

          <strong className="col-span-3">Email:</strong>
          <p className="col-span-9">{store.storeEmail}</p>
        </div>

        {store.storeWebsite && (
          <div className="text-center mb-4">
            <a
              href={store.storeWebsite}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Visit Website
            </a>
          </div>
        )}

        <div className="text-center mt-6">
          <Link to="/admin/dashboard" className="text-gray-600 hover:underline">
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
