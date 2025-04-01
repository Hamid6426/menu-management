import React from "react";
import { Link, useLocation } from "react-router-dom";

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((segment) => segment);

  return (
    <nav aria-label="breadcrumb" style={{ margin: "1rem 0" }}>
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">Home</Link>
        </li>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;

          // Optionally, you can improve the label here
          const label = value.charAt(0).toUpperCase() + value.slice(1);

          return isLast ? (
            <li key={to} className="breadcrumb-item active" aria-current="page">
              {label}
            </li>
          ) : (
            <li key={to} className="breadcrumb-item">
              <Link to={to}>{label}</Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
