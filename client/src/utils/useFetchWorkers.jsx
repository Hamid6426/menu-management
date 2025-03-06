import { useEffect, useState } from "react";
import axiosInstance from "./axiosConfig";
import useFetchStores from "./useFetchStores";

const useFetchWorkers = (storeId) => {
  const [workers, setWorkers] = useState([]);
  const [workerLoading, setWorkerLoading] = useState(true);
  const [workerError, setWorkerError] = useState(null);
  const { stores, storeLoading } = useFetchStores();

  useEffect(() => {
    if (!storeId) return;

    const fetchWorkers = async () => {
      try {
        const response = await axiosInstance.get(`/workers/store/${storeId}`);
        setWorkers(response.data);
      } catch (err) {
        setWorkerError(err.message);
      } finally {
        setWorkerLoading(false);
      }
    };

    fetchWorkers();
  }, [storeId]);

  return { workers, workerLoading, workerError };
};

export default useFetchWorkers;
