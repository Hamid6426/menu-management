import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer-section">
      <div className="container py-5">
        <div className="row gy-4">
          <div className="col-md-4">
            <h4 className="footer-brand">MenuMaster</h4>
            <p>Making menu management simple and efficient for restaurants worldwide.</p>
          </div>

          <div className="col-md-2">
            <h5>Product</h5>
            <ul className="footer-links list-unstyled">
              <li><a href="#features">Features</a></li>
              <li><a href="#pricing">Pricing</a></li>
              <li><a href="#how-it-works">How It Works</a></li>
            </ul>
          </div>

          <div className="col-md-2">
            <h5>Company</h5>
            <ul className="footer-links list-unstyled">
              <li><a href="#">About</a></li>
              <li><a href="#">Contact</a></li>
              <li><a href="#">Blog</a></li>
            </ul>
          </div>

          <div className="col-md-4">
            <h5>Stay Updated</h5>
            <form className="input-group">
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                aria-label="Email"
              />
              <button className="btn btn-primary" type="submit">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="footer-bottom text-center py-3">
        <p className="mb-0">&copy; {new Date().getFullYear()} MenuMaster. All rights reserved.</p>
      </div>
    </footer>
  );
}
