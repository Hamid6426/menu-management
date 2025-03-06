import useFetchStores from "../../utils/useFetchStores";
import StoresTeaser from "../../components/admin/StoresTeaser";

export default function AdminDashboard() {
  const { stores, storeLoading } = useFetchStores(); // Fetch stores here

  return (
    <div className="w-full min-h-screen px-6 py-3 justify-start flex flex-col items-center">
      <h2 className="text-3xl font-black text-center">Admin Dashboard</h2>

      <StoresTeaser />

      {/* Add Store Button */}
      <a
        href="/admin/create-store"
        className={`text-center mx-auto font-bold rounded py-2 px-4 ${
          stores.length >= 3
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-orange-500 text-white hover:bg-orange-700"
        }`}
        style={{ pointerEvents: stores.length >= 3 ? "none" : "auto" }}
      >
        Add a Store
      </a>
    </div>
  );
}
