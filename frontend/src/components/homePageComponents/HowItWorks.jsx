import React from "react";
import "./HowItWorks.css";

export default function HowItWorks() {
  return (
    <section className="how-it-works-section py-5" id="how-it-works">
      <div className="container-fluid px-5">
        <h2 className="section-title text-center text-main mb-5">
          How It Works
        </h2>
        <div className="row g-4">
          <div className="col-md-4">
            <div className="step-card text-center p-4 h-100">
              <div className="step-number mb-3">1</div>
              <h3 className="mb-2">Sign Up</h3>
              <p>Create your account and upload your existing menu in minutes.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="step-card text-center p-4 h-100">
              <div className="step-number mb-3">2</div>
              <h3 className="mb-2">Customize</h3>
              <p>Organize your menu categories and items with our drag-and-drop interface.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="step-card text-center p-4 h-100">
              <div className="step-number mb-3">3</div>
              <h3 className="mb-2">Go Live</h3>
              <p>Publish your menu and start managing it in real-time.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
