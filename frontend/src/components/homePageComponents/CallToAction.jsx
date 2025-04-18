import React from "react";
import { Link } from "react-router-dom";

export default function CallToAction() {
  return (
    <section className="py-12 w-full" id="get-started">
      <div className="max-w-4xl mx-auto text-center px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-red-600 mb-4">
          Ready to Transform Your Menu Management?
        </h2>
        <p className="text-lg text-stone-700 mb-6">
          Join thousands of restaurants already using our platform
        </p>
        <Link
          to="/signup-as"
          className="inline-block px-8 py-3 bg-red-600 text-white text-lg font-semibold rounded-xl hover:bg-red-700 transition"
        >
          Start Free Trial
        </Link>
      </div>
    </section>
  );
}
