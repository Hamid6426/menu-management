import React from "react";
import { Link } from "react-router-dom";
import "./Pricing.css";

export default function Pricing() {
  return (
    <section className="pricing-section py-5 w-100" id="pricing">
      <div className="container-fluid px-5">
        <h2 className="section-title text-center text-main mb-5">
          Simple Pricing
        </h2>
        <div className="row g-4">
          <div className="col-md-4">
            <div className="pricing-card p-4 text-center h-100">
              <h3 className="mb-3">Starter</h3>
              <div className="price mb-4">
                $10<span>/month</span>
              </div>
              <ul className="pricing-features list-unstyled mb-4">
                <li>Up to 20 menu items</li>
                <li>Basic analytics</li>
                <li>Email support</li>
              </ul>
              <button className="btn btn-outline-primary w-100">
                Choose Starter
              </button>
            </div>
          </div>

          <div className="col-md-4">
            <div className="pricing-card featured p-4 text-center h-100">
              <h3 className="mb-3">Professional</h3>
              <div className="price mb-4">
                $20<span>/month</span>
              </div>
              <ul className="pricing-features list-unstyled mb-4">
                <li>Up to 100 menu items</li>
                <li>Advanced analytics</li>
                <li>Priority support</li>
              </ul>
              <Link to="/contact" className="btn btn-primary w-100">
                Choose Pro
              </Link>
            </div>
          </div>

          <div className="col-md-4">
            <div className="pricing-card p-4 text-center h-100">
              <h3 className="mb-3">Enterprise</h3>
              <div className="price mb-4">
                $99<span>/month</span>
              </div>
              <ul className="pricing-features list-unstyled mb-4">
                <li>Multiple locations</li>
                <li>Custom features</li>
                <li>24/7 support</li>
              </ul>
              <button className="btn btn-outline-primary w-100">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
