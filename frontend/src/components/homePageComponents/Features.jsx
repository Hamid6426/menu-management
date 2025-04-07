import React from "react";
import "./Features.css";

export default function Features() {
  return (
    <section className="features-section py-5" id="features">
      <div className="container-fluid px-5">
        <h2 className="section-title text-center text-main mb-5">
          Powerful Features
        </h2>
        <div className="row g-4">
          <div className="col-md-4">
            <div className="feature-card text-center p-4 h-100">
              <i className="bi bi-pencil-square feature-icon mb-3"></i>
              <h3 className="mb-2">Easy Menu Editing</h3>
              <p>
                Update your menu items, prices, and descriptions in real-time
                with our intuitive interface.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="feature-card text-center p-4 h-100">
              <i className="bi bi-phone feature-icon mb-3"></i>
              <h3 className="mb-2">Mobile Friendly</h3>
              <p>
                Manage your menu on any device with our responsive design and
                mobile-first approach.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="feature-card text-center p-4 h-100">
              <i className="bi bi-graph-up feature-icon mb-3"></i>
              <h3 className="mb-2">Analytics & Insights</h3>
              <p>
                Track popular items and optimize your menu based on real data
                and customer preferences.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
