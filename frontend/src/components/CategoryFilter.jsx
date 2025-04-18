import React from "react";
import { useTranslation } from "react-i18next";

const CategoryFilter = ({ categories, selectedCategory, setSelectedCategory }) => {
  const { t } = useTranslation();
  
  return (
    <div className="mb-4">
      <select
        className="block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
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
