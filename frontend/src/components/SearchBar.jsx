import React from "react";
import { useTranslation } from "react-i18next";

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  const { t } = useTranslation();

  return (
    <div className="mb-3">
      <input
        type="text"
        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
        placeholder={t("searchBar.placeholder")}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
