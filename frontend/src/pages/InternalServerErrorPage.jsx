import React from "react";

const InternalServerErrorPage = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        <h1 className="display-4 fw-bold mb-4">500: Internal Server Error</h1>
        <p className="lead mb-4">
          Sorry, something went wrong on our end. Please try again later or contact our{" "}
          <a href="/contact" className="text-decoration-underline">
            support team
          </a>.
        </p>
      </div>
    </div>
  );
};

export default InternalServerErrorPage;
