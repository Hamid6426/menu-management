import React from "react";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="py-16 w-full bg-rose-50 text-stone-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12">
          {/* Text Section */}
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold text-red-600 mb-6">
              Manage Your Restaurant Menu with Ease
            </h1>
            <p className="text-lg text-stone-700 mb-8">
              Streamline your menu management process, update prices instantly,
              and keep your customers informed in real-time.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/signup-as"
                className="px-6 py-3 bg-rose-500 text-white font-semibold rounded-xl hover:bg-red-600 transition"
              >
                Start Free Trial
              </Link>
              <Link
                to="/demo"
                className="px-6 py-3 border-2 border-red-600 text-red-600 font-semibold rounded-xl hover:bg-red-600 hover:text-white transition"
              >
                Watch Demo
              </Link>
            </div>
          </div>

          {/* Image Section */}
          <div>
            <img
              src="/chunks.jpg"
              alt="Menu Management Dashboard"
              className="w-full rounded-xl shadow-md"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
