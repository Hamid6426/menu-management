import React from "react";

const NotFoundPage = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        <h1 className="display-4 fw-bold mb-4">404: Page Not Found</h1>
        <p className="lead mb-4">
          Sorry, the page you're looking for doesn't exist. You can try searching for it or return to our{" "}
          <a href="/" className="text-decoration-underline">
            Home
          </a>.
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;
