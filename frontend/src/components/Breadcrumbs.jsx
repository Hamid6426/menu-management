import React from "react";
import { Link, useLocation } from "react-router-dom";
import { MdHome, MdChevronRight } from "react-icons/md";
import { useTranslation } from "react-i18next";

const Breadcrumbs = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((segment) => segment);

  return (
    <nav aria-label="breadcrumb" style={{ backgroundColor: "#eee", width: "100%" }}>
      <ol className="breadcrumb rounded p-2 d-flex align-items-center" style={{ backgroundColor: "#eee", width: "100%" }}>
        <li className="breadcrumb-item">
          <Link to="/" className="text-decoration-none text-dark fw-bold d-flex align-items-center">
            <MdHome size={18} className="me-1" /> Home
          </Link>
        </li>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          const label = value.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

          return (
            <React.Fragment key={to}>
              <MdChevronRight size={16} className="text-muted mx-1" />
              <li className={`breadcrumb-item ${isLast ? "active text-primary fw-bold" : ""}`}>
                {isLast ? (
                  label
                ) : (
                  <Link to={to} className="text-decoration-none text-dark fw-semibold">
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
