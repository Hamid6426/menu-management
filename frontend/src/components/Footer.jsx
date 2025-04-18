import React from "react";

export default function Footer() {
  return (
    <footer className=" text-stone-700 border-t-2 border-rose-200">
      <div className="max-w-7xl bg-rose-50 mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div>
            <h4 className="text-2xl font-semibold text-red-600 mb-4">MenuMaster</h4>
            <p className="text-base">
              Making menu management simple and efficient for restaurants worldwide.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h5 className="text-lg font-semibold text-red-600 mb-3">Product</h5>
            <ul className="space-y-2 text-stone-600">
              <li>
                <a href="#features" className="hover:text-red-600 transition">
                  Features
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-red-600 transition">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-red-600 transition">
                  How It Works
                </a>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h5 className="text-lg font-semibold text-red-600 mb-3">Company</h5>
            <ul className="space-y-2 text-stone-600">
              <li>
                <a href="#" className="hover:text-red-600 transition">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-red-600 transition">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-red-600 transition">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Stay Updated Section */}
          <div>
            <h5 className="text-lg font-semibold text-red-600 mb-3">Stay Updated</h5>
            <form className="flex">
              <input
                type="email"
                className="px-4 py-2 rounded-l-xl border-2 border-stone-300 text-stone-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                placeholder="Enter your email"
                aria-label="Email"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-red-600 text-white rounded-r-xl hover:bg-red-700 transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="bg-red-600 text-white py-3 text-center">
        <p className="mb-0">&copy; {new Date().getFullYear()} MenuMaster. All rights reserved.</p>
      </div>
    </footer>
  );
}
