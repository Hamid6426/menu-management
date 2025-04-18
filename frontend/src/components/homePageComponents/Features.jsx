import React from "react";

export default function Features() {
  return (
    <section className="py-16 bg-white text-stone-900" id="features">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-red-600 text-center mb-12">
          Powerful Features
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature Card 1 */}
          <div className="bg-rose-50 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition">
            <div className="text-4xl text-red-600 mb-4">
              <i className="bi bi-pencil-square"></i>
            </div>
            <h3 className="text-xl font-semibold mb-2">Easy Menu Editing</h3>
            <p className="text-stone-700">
              Update your menu items, prices, and descriptions in real-time
              with our intuitive interface.
            </p>
          </div>

          {/* Feature Card 2 */}
          <div className="bg-rose-50 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition">
            <div className="text-4xl text-red-600 mb-4">
              <i className="bi bi-phone"></i>
            </div>
            <h3 className="text-xl font-semibold mb-2">Mobile Friendly</h3>
            <p className="text-stone-700">
              Manage your menu on any device with our responsive design and
              mobile-first approach.
            </p>
          </div>

          {/* Feature Card 3 */}
          <div className="bg-rose-50 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition">
            <div className="text-4xl text-red-600 mb-4">
              <i className="bi bi-graph-up"></i>
            </div>
            <h3 className="text-xl font-semibold mb-2">Analytics & Insights</h3>
            <p className="text-stone-700">
              Track popular items and optimize your menu based on real data
              and customer preferences.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
