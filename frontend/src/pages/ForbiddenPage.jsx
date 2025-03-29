import React from "react";

const ForbiddenPage = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        <h1 className="display-4 fw-bold mb-4">403: Forbidden</h1>
        <p className="lead mb-4">
          Sorry, you don't have permission to access this page. Please{" "}
          <a href="/login" className="text-decoration-underline">
            log in
          </a>{" "}
          or contact our{" "}
          <a href="/contact" className="text-decoration-underline">
            support team
          </a>{" "}
          for assistance.
        </p>
      </div>
    </div>
  );
};

export default ForbiddenPage;
