import React from "react";
import { Link, useLocation } from "react-router-dom";
import { MdHome, MdChevronRight } from "react-icons/md";

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(Boolean);

  return (
    <nav aria-label="breadcrumb" className="w-full bg-gray-100">
      <ol className="flex items-center flex-wrap space-x-1 p-2 text-xs text-gray-600">
        <li className="flex items-center">
          <Link to="/" className="flex items-center text-gray-700">
            <MdHome size={16} />
          </Link>
        </li>

        {pathnames.map((segment, idx) => {
          const to = `/${pathnames.slice(0, idx + 1).join("/")}`;
          const label = segment.replace(/-/g, " ");

          return (
            <React.Fragment key={to}>
              <MdChevronRight size={14} className="text-gray-400" />
              <li className="truncate max-w-[100px]">
                {idx === pathnames.length - 1 ? (
                  <span className="text-red-500">{label}</span>
                ) : (
                  <Link to={to} className="text-gray-700">
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
