import React from "react";

export default function HowItWorks() {
  return (
    <section className="py-16 bg-white text-stone-900" id="how-it-works">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-red-600 text-center mb-12">
          How It Works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="bg-rose-50 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition">
            <div className="text-3xl w-12 h-12 mx-auto mb-4 bg-red-600 text-white rounded-full flex items-center justify-center font-bold">
              1
            </div>
            <h3 className="text-xl font-semibold mb-2">Sign Up</h3>
            <p className="text-stone-700">
              Create your account and upload your existing menu in minutes.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-rose-50 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition">
            <div className="text-3xl w-12 h-12 mx-auto mb-4 bg-red-600 text-white rounded-full flex items-center justify-center font-bold">
              2
            </div>
            <h3 className="text-xl font-semibold mb-2">Customize</h3>
            <p className="text-stone-700">
              Organize your menu categories and items with our drag-and-drop interface.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-rose-50 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition">
            <div className="text-3xl w-12 h-12 mx-auto mb-4 bg-red-600 text-white rounded-full flex items-center justify-center font-bold">
              3
            </div>
            <h3 className="text-xl font-semibold mb-2">Go Live</h3>
            <p className="text-stone-700">
              Publish your menu and start managing it in real-time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
