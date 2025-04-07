import React from "react";
import { Link } from "react-router-dom";
import "./CallToAction.css";

export default function CallToAction() {
  return (
    <section className="cta-section py-5 w-100" id="get-started">
      <div className="container text-center px-5">
        <h2 className="cta-title mb-3">Ready to Transform Your Menu Management?</h2>
        <p className="cta-subtitle mb-4">Join thousands of restaurants already using our platform</p>
        <Link to="/signup-as" className="btn btn-lg btn-primary">
          Start Free Trial
        </Link>
      </div>
    </section>
  );
}
