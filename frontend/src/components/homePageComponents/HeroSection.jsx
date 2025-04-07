import React from "react";
import "./HeroSection.css";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="hero-section py-5">
      <div className="container-fluid px-5">
        <div className="row align-items-center">
          {/* Text Section */}
          <div className="col-md-6 mb-4 mb-md-0">
            <h1 className="display-5 fw-bold text-main mb-3">
              Manage Your Restaurant Menu with Ease
            </h1>
            <p className="lead text-dark mb-4">
              Streamline your menu management process, update prices instantly,
              and keep your customers informed in real-time.
            </p>
            <div className="d-flex flex-wrap gap-3">
              <Link to="/signup-as" className="btn btn-primary custom-btn">
                Start Free Trial
              </Link>
              <Link to="/demo" className="btn btn-outline-primary custom-btn">
                Watch Demo
              </Link>
            </div>
          </div>

          {/* Image Section */}
          <div className="col-md-6">
            <img
              src="/chunks.jpg"
              alt="Menu Management Dashboard"
              className="img-fluid hero-image"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
