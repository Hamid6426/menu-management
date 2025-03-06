import useFetchStores from "../../utils/useFetchStores";

export default function StoresTeaser() {
  const { stores, loading: storeLoading } = useFetchStores();

  if (storeLoading) return <p>Loading stores...</p>;
  if (stores.length === 0) return <p>No stores found.</p>;

  return (
    <div className="w-full max-w-2xl p-4 flex flex-col justify-center items-center gap-6">
      {stores.map((store) => {
        const imageSrc = store.storeThumbnail || "/default-image.jpg";

        return (
          <div
            key={store._id}
            className="flex p-4 h-full border-2 bg-white border-red-400 rounded-xl w-full"
          >
            <img
              src={imageSrc}
              alt={store.storeName}
              className="h-24 w-24 border-2"
            />
            <div className="pl-4 min-h-max flex flex-col justify-between w-full">
              <div className="w-full flex flex-col">
                <h2 className="text-xl font-bold text-orange-500 bg-gray-100 px-2 py-1">
                  {store.storeName}
                </h2>
                <p className="text-sm my-2 px-2">
                  {store.description.length > 200
                    ? `${store.description.slice(0, 120)}...`
                    : store.description}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
