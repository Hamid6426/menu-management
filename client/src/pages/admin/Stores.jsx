import StoreList from "../../components/admin/StoreList";
import { Link } from "react-router-dom";
import DeleteStoreButton from "../../components/admin/DeleteStoreButton";

export default function Stores({ stores, setStores, storeLoading } ) {
  return (
    <div className="w-full min-h-screen px-6">
      <h2 className="text-3xl font-black my-4">Your Stores</h2>
      <div className="flex flex-row gap-x-4 overflow-y-auto pb-4">
        <StoreList stores={stores} setStores={setStores} loading={storeLoading} />
      </div>
    </div>  
  );
}
