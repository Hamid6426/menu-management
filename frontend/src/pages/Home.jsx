import React from "react";
import "./Home.css";

export default function Home() {

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section" id="home">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="hero-title">Manage Your Restaurant Menu with Ease</h1>
              <p className="hero-subtitle">
                Streamline your menu management process, update prices instantly, and keep your customers informed in
                real-time.
              </p>
              <div className="hero-buttons">
                <button className="btn btn-primary btn-lg me-3">Start Free Trial</button>
                <button className="btn btn-outline-primary btn-lg">Watch Demo</button>
              </div>
            </div>
            <div className="col-lg-6">
              <img src="/chunks.jpg" alt="Menu Management Dashboard" className="img-fluid hero-image" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section" id="features">
        <div className="container">
          <h2 className="section-title text-center">Powerful Features</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="feature-card">
                <i className="bi bi-pencil-square feature-icon"></i>
                <h3>Easy Menu Editing</h3>
                <p>Update your menu items, prices, and descriptions in real-time with our intuitive interface.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-card">
                <i className="bi bi-phone feature-icon"></i>
                <h3>Mobile Friendly</h3>
                <p>Manage your menu on any device with our responsive design and mobile-first approach.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-card">
                <i className="bi bi-graph-up feature-icon"></i>
                <h3>Analytics & Insights</h3>
                <p>Track popular items and optimize your menu based on real data and customer preferences.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section" id="how-it-works">
        <div className="container">
          <h2 className="section-title text-center">How It Works</h2>
          <div className="row">
            <div className="col-md-4">
              <div className="step-card">
                <div className="step-number">1</div>
                <h3>Sign Up</h3>
                <p>Create your account and upload your existing menu in minutes.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="step-card">
                <div className="step-number">2</div>
                <h3>Customize</h3>
                <p>Organize your menu categories and items with our drag-and-drop interface.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="step-card">
                <div className="step-number">3</div>
                <h3>Go Live</h3>
                <p>Publish your menu and start managing it in real-time.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="pricing-section" id="pricing">
        <div className="container">
          <h2 className="section-title text-center">Simple Pricing</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="pricing-card">
                <h3>Starter</h3>
                <div className="price">
                  $29<span>/month</span>
                </div>
                <ul className="pricing-features">
                  <li>Up to 100 menu items</li>
                  <li>Basic analytics</li>
                  <li>Email support</li>
                </ul>
                <button className="btn btn-outline-primary w-100">Choose Starter</button>
              </div>
            </div>
            <div className="col-md-4">
              <div className="pricing-card featured">
                <h3>Professional</h3>
                <div className="price">
                  $49<span>/month</span>
                </div>
                <ul className="pricing-features">
                  <li>Unlimited menu items</li>
                  <li>Advanced analytics</li>
                  <li>Priority support</li>
                </ul>
                <button className="btn btn-primary w-100">Choose Pro</button>
              </div>
            </div>
            <div className="col-md-4">
              <div className="pricing-card">
                <h3>Enterprise</h3>
                <div className="price">
                  $99<span>/month</span>
                </div>
                <ul className="pricing-features">
                  <li>Multiple locations</li>
                  <li>Custom features</li>
                  <li>24/7 support</li>
                </ul>
                <button className="btn btn-outline-primary w-100">Contact Sales</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section" id="get-started">
        <div className="container text-center">
          <h2>Ready to Transform Your Menu Management?</h2>
          <p>Join thousands of restaurants already using our platform</p>
          <button className="btn btn-primary btn-lg">
            <a href="signup-as" className="nav-link text-dark fw-medium py-2 rounded hover-bg-light mx-2">Start Your Free Trial</a>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <h4>MenuMaster</h4>
              <p>Making menu management simple and efficient for restaurants worldwide.</p>
            </div>
            <div className="col-md-2">
              <h5>Product</h5>
              <ul className="footer-links">
                <li>
                  <a href="#features">Features</a>
                </li>
                <li>
                  <a href="#pricing">Pricing</a>
                </li>
                <li>
                  <a href="#how-it-works">How It Works</a>
                </li>
              </ul>
            </div>
            <div className="col-md-2">
              <h5>Company</h5>
              <ul className="footer-links">
                <li>
                  <a href="#">About</a>
                </li>
                <li>
                  <a href="#">Contact</a>
                </li>
                <li>
                  <a href="#">Blog</a>
                </li>
              </ul>
            </div>
            <div className="col-md-4">
              <h5>Stay Updated</h5>
              <div className="input-group">
                <input type="email" className="form-control" placeholder="Enter your email" />
                <button className="btn btn-primary">Subscribe</button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
