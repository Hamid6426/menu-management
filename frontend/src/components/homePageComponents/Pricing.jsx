import React from "react";
import { Link } from "react-router-dom";

export default function Pricing() {
  return (
    <section className="py-16 bg-white text-stone-900 w-full" id="pricing">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-red-600 text-center mb-12">
          Simple Pricing
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Starter Plan */}
          <div className="bg-rose-50 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-3">Starter</h3>
            <div className="text-3xl font-bold text-red-600 mb-4">
              $10<span className="text-base font-medium text-stone-500">/month</span>
            </div>
            <ul className="space-y-2 text-stone-700 mb-6">
              <li>Up to 20 menu items</li>
              <li>Basic analytics</li>
              <li>Email support</li>
            </ul>
            <button className="w-full py-2 px-4 border-2 border-red-600 text-red-600 rounded-lg font-medium hover:bg-red-600 hover:text-white transition">
              Choose Starter
            </button>
          </div>

          {/* Professional Plan (Featured) */}
          <div className="bg-red-600 text-white rounded-xl p-6 text-center shadow-md transform scale-[1.03]">
            <h3 className="text-xl font-semibold mb-3">Professional</h3>
            <div className="text-3xl font-bold mb-4">
              $20<span className="text-base font-medium text-rose-100">/month</span>
            </div>
            <ul className="space-y-2 text-rose-100 mb-6">
              <li>Up to 100 menu items</li>
              <li>Advanced analytics</li>
              <li>Priority support</li>
            </ul>
            <Link
              to="/contact"
              className="w-full inline-block py-2 px-4 bg-white text-red-600 rounded-lg font-medium hover:bg-rose-100 transition"
            >
              Choose Pro
            </Link>
          </div>

          {/* Enterprise Plan */}
          <div className="bg-rose-50 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-3">Enterprise</h3>
            <div className="text-3xl font-bold text-red-600 mb-4">
              $99<span className="text-base font-medium text-stone-500">/month</span>
            </div>
            <ul className="space-y-2 text-stone-700 mb-6">
              <li>Multiple locations</li>
              <li>Custom features</li>
              <li>24/7 support</li>
            </ul>
            <button className="w-full py-2 px-4 border-2 border-red-600 text-red-600 rounded-lg font-medium hover:bg-red-600 hover:text-white transition">
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
