import React from "react";

export default function Footer() {
  return (
    <footer className="w-full border-t-2 border-rose-200 text-stone-700">
      {/* Top Section */}
      <div className="w-full bg-rose-50 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid w-full grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-4">
            {/* About Section */}
            <section className="flex flex-col">
              <h4 className="mb-4 text-2xl font-semibold text-red-600">
                MenuMaster
              </h4>
              <p className="text-base">
                Making menu management simple and efficient for restaurants
                worldwide.
              </p>
            </section>

            {/* Product Links */}
            <section>
              <h5 className="mb-3 text-lg font-semibold text-red-600">
                Product
              </h5>
              <ul className="space-y-2 text-stone-600">
                <li>
                  <a href="#features" className="transition hover:text-red-600">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="transition hover:text-red-600">
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#how-it-works"
                    className="transition hover:text-red-600"
                  >
                    How It Works
                  </a>
                </li>
              </ul>
            </section>

            {/* Company Links */}
            <section>
              <h5 className="mb-3 text-lg font-semibold text-red-600">
                Company
              </h5>
              <ul className="space-y-2 text-stone-600">
                <li>
                  <a href="#" className="transition hover:text-red-600">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="transition hover:text-red-600">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="transition hover:text-red-600">
                    Blog
                  </a>
                </li>
              </ul>
            </section>

            {/* Stay Updated Section */}
            <section>
              <h5 className="mb-3 text-lg font-semibold text-red-600">
                Stay Updated
              </h5>
              <form className="flex">
                <input
                  type="email"
                  className="rounded-l-xl border-2 border-stone-300 px-4 py-2 text-stone-700 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-red-600"
                  placeholder="Enter your email"
                  aria-label="Email"
                />
                <button
                  type="submit"
                  className="rounded-r-xl bg-red-600 px-6 py-2 text-white transition hover:bg-red-700"
                >
                  Subscribe
                </button>
              </form>
            </section>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-red-600 py-3 text-center text-white">
        <p className="mb-0">
          &copy; {new Date().getFullYear()} MenuMaster. All rights reserved.
        </p>
      </div>
    </footer>
  );
}