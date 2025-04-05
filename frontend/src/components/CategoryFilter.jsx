import React from "react";
import { useTranslation } from "react-i18next";

const CategoryFilter = ({ categories, selectedCategory, setSelectedCategory }) => {
  const { t } = useTranslation();
  return (
    <div className="mb-3">
      <select
        className="form-select"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        {categories.map((category, index) => (
          <option key={index} value={category}>
            {t(`categories.${category}`, category)} 
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;
