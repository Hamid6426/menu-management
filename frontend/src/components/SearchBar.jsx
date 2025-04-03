import React from "react";
import { useTranslation } from "react-i18next";

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  const { t } = useTranslation();

  return (
    <div className="mb-3">
      <input
        type="text"
        className="form-control"
        placeholder={t("searchBar.placeholder")}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
