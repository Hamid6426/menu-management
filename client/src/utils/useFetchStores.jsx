import { useState, useEffect } from "react";
import axiosInstance from "./axiosConfig";

export default function useFetchStores() {
  const [stores, setStores] = useState([]);
  const [storeLoading, setStoreLoading] = useState(true);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await axiosInstance.get("/stores");
        setStores(response.data);
      } catch (error) {
        console.error("Error fetching stores:", error);
      } finally {
        setStoreLoading(false);
      }
    };

    fetchStores();
  }, []);

  return { stores, setStores, storeLoading };
}
