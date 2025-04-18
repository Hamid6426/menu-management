import React from "react";
import { Link, useLocation } from "react-router-dom";
import { MdHome, MdChevronRight } from "react-icons/md";
import { useTranslation } from "react-i18next";

const Breadcrumbs = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((segment) => segment);

  return (
    <nav aria-label="breadcrumb" className="bg-gray-200 w-full">
      <ol className="flex items-center space-x-2 p-2 bg-gray-200 rounded">
        <li>
          <Link to="/" className="text-gray-800 text-sm font-bold flex items-center">
            <MdHome size={18} className="ml-2" />
          </Link>
        </li>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          const label = value.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

          return (
            <React.Fragment key={to}>
              <MdChevronRight size={16} className="text-gray-400 mx-1" />
              <li className="text-sm font-bold text-orange-500">
                {index === pathnames.length - 1 ? (
                  label
                ) : (
                  <Link to={to} className="text-gray-800 font-bold hover:text-orange-500">
                    {label}
                  </Link>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
