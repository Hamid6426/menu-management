  import { useState } from "react";
  import axiosInstance from "../../utils/axiosConfig";

  export default function DeleteStoreButton({ storeId, onDelete }) {
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
      if (!storeId) {
        console.error("Error: Store ID is missing.");
        return;
      }

      const isConfirmed = window.confirm("Are you sure you want to delete this store?");
      if (!isConfirmed) return;

      setLoading(true);
      try {
        const response = await axiosInstance.delete(`/stores/${storeId}`);
        if (response.status === 200) {
          onDelete(storeId); // Remove store from UI
        } else {
          console.error("Unexpected response:", response);
          alert("Something went wrong. Please try again.");
        }
      } catch (error) {
        console.error("Error deleting store:", error);
        alert(error.response?.data?.message || "Failed to delete store. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    return (
      <button 
        onClick={handleDelete} 
        className={`w-full bg-red-500 text-sm text-white font-bold hover:bg-red-700 rounded py-1 px-3 ${loading ? "opacity-50 cursor-not-allowed" : ""}`} 
        disabled={loading}
      >
        {loading ? "Deleting..." : "Delete"}
      </button>
    );
  }
