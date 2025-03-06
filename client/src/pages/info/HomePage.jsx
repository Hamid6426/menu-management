import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="w-full min-h-screen">
      {/* Hero Section */}
      <header className="flex flex-col justify-center items-center h-[740px] bg-gradient-to-b from-red-600 from-40% via-red-500 via-70% to-red-400 to-100% text-white py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
          QR Code Menus Made Easy
        </h1>
        <p className="text-lg md:text-2xl mb-6">
          Transform the dining experience with instant access to digital menus.
        </p>
        <Link
          to="/auth/signin"
          className="py-2 px-4 bg-transparent border-2 border-white text-white font-black hover:text-red-600 hover:bg-white transition"
        >
          Get Started
        </Link>
      </header>

      <main className="bg-gradient-to-b from-white to-gray-300">
      {/* Features Section */}
      <section className="py-16">
        <div className="w-[80%] mx-auto px-6 ">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Feature 1 */}
            <div className="bg-white p-6 shadow-2xl drop-shadow-2xl rounded-lg text-center transition">
              <h3 className="text-xl font-bold mb-4">Seamless Access</h3>
              <p className="text-gray-600">
                Customers can scan and browse menus instantly, no app download required.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="bg-white p-6 shadow-2xl drop-shadow-2xl rounded-lg text-center transition">
              <h3 className="text-xl font-bold mb-4">Customizable Menus</h3>
              <p className="text-gray-600">
                Update dishes, prices, and images in real-time to keep menus fresh.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="bg-white p-6 shadow-2xl drop-shadow-2xl rounded-lg text-center transition">
              <h3 className="text-xl font-bold mb-4">Eco-Friendly</h3>
              <p className="text-gray-600">
                Say goodbye to paper menus and contribute to a sustainable future.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16">
        <div className="w-[80%] mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {/* Step 1 */}
            <div className="p-6">
              <div className="text-purple-600 text-4xl mb-4">📸</div>
              <h3 className="text-xl font-bold mb-4">Scan the QR Code</h3>
              <p className="text-gray-600">
                Place QR codes on tables for easy customer access.
              </p>
            </div>
            {/* Step 2 */}
            <div className="p-6">
              <div className="text-purple-600 text-4xl mb-4">📱</div>
              <h3 className="text-xl font-bold mb-4">View the Menu</h3>
              <p className="text-gray-600">
                Customers view the menu directly on their phones.
              </p>
            </div>
            {/* Step 3 */}
            <div className="p-6">
              <div className="text-purple-600 text-4xl mb-4">🍽️</div>
              <h3 className="text-xl font-bold mb-4">Order & Enjoy</h3>
              <p className="text-gray-600">
                Customers place orders seamlessly for a great dining experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className=" py-16">
        <div className="mx-auto px-6 w-[80%]">
          <h2 className="text-3xl font-bold text-center mb-8">What Our Clients Say</h2>
          <div className="flex justify-center space-x-8">
            <div className="bg-white p-8 shadow-xl rounded-lg max-w-xs text-center">
              <p className="text-gray-600 mb-4">&quot;QR-Menu has transformed how we interact with our customers. The process is smoother and much more efficient!&quot;</p>
              <p className="font-semibold text-gray-800">John Doe</p>
              <p className="text-gray-500">Restaurant Owner</p>
            </div>
            <div className="bg-white p-8 shadow-xl rounded-lg max-w-xs text-center">
              <p className="text-gray-600 mb-4">&quot;A game-changer for my cafe! Customers love the simplicity, and we&apos;ve seen an increase in order accuracy.&quot;</p>
              <p className="font-semibold text-gray-800">Jane Smith</p>
              <p className="text-gray-500">Cafe Manager</p>
            </div>
            <div className="bg-white p-8 shadow-xl rounded-lg max-w-xs text-center">
              <p className="text-gray-600 mb-4">&quot;The system&apos;s ease of use and integration with our POS has made a huge difference in our operations.&quot;</p>
              <p className="font-semibold text-gray-800">Michael Brown</p>
              <p className="text-gray-500">Restaurant Manager</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16">
        <div className="mx-auto px-6 text-center w-[80%]">
          <h2 className="text-3xl font-bold mb-8">Pricing Plans</h2>
          <div className="flex justify-center space-x-8 ">
            {/* Plan 1 */}
            <div className="flex flex-col justify-between bg-white p-8 shadow-xl rounded-lg w-1/3">
              <h3 className="text-2xl font-bold mb-4">Basic Plan</h3>
              <p className="text-gray-600 mb-4">$19/month</p>
              <ul className="list-disc text-left mb-6">
                <li>Access to basic features</li>
                <li>Up to 1 restaurant</li>
                <li>Basic support</li>
              </ul>
              <Link to="/auth/signup" className="py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">Get Started</Link>
            </div>
            {/* Plan 2 */}
            <div className="flex flex-col justify-between bg-white p-8 shadow-xl rounded-lg w-1/3">
              <h3 className="text-2xl font-bold mb-4">Pro Plan</h3>
              <p className="text-gray-600 mb-4">$49/month</p>
              <ul className="list-disc text-left mb-6">
                <li>Advanced features</li>
                <li>Up to 5 restaurants</li>
                <li>Priority support</li>
              </ul>
              <Link to="/auth/signup" className="py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">Get Started</Link>
            </div>
            {/* Plan 3 */}
            <div className="flex flex-col justify-between bg-white p-8 shadow-xl rounded-lg w-1/3">
              <h3 className="text-2xl font-bold mb-4">Enterprise Plan</h3>
              <p className="text-gray-600 mb-4">Custom pricing</p>
              <ul className="list-disc text-left mb-6">
                <li>All features included</li>
                <li>Unlimited restaurants</li>
                <li>Dedicated account manager</li>
              </ul>
              <Link to="/auth/signup" className="py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">Get Started</Link>
            </div>
          </div>
        </div>
      </section>
      </main>

      {/* Call to Action */}
      <section className="bg-gradient-to-b from-red-400 from-0% via-red-500 via-25% to-red-600 to-100% text-white py-16 text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Elevate Your Restaurant?
          </h2>
          <p className="text-lg mb-6">
            Sign up today and transform how your customers dine.
          </p>
          <Link
          to="/auth/signin"
          className="py-2 px-4 bg-transparent border-2 border-white text-white font-black hover:text-red-600 hover:bg-white transition"
        >
          Get Started
        </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full flex flex-col justify-center items-center bg-red-600 text-white py-12">
        <div className="mx-auto md:w-[80%] grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {/* Column 1: Contact Info */}
          
          <div className="flex flex-col justify-start items-center gap-y-2 md:items-start">
            <h3 className="text-2xl font-bold mb-4">QR Menu App</h3>
            <p className="text-gray-300 mb-4">
              Transforming the dining experience with seamless digital menu access.
            </p>
          </div>

          <div className="flex flex-col justify-start items-center gap-y-2 md:items-start md:pl-20">
            <h3 className="text-2xl font-bold mb-4">Quick Links1</h3>
            <Link to="/about" className="text-gray-300 hover:text-white transition">About Us</Link>
            <Link to="/contact" className="text-gray-300 hover:text-white transition">Contact</Link>
            <Link to="/terms" className="text-gray-300 hover:text-white transition">Terms & Conditions</Link>
            <Link to="/privacy" className="text-gray-300 hover:text-white transition">Privacy Policy</Link>
          </div>

          <div className="flex flex-col justify-start items-center gap-y-2 md:items-start xl:pl-20">
            <h3 className="text-2xl font-bold mb-4">Quick Links2</h3>
            <Link to="/about" className="text-gray-300 hover:text-white transition">About Us</Link>
            <Link to="/contact" className="text-gray-300 hover:text-white transition">Contact</Link>
            <Link to="/terms" className="text-gray-300 hover:text-white transition">Terms & Conditions</Link>
            <Link to="/privacy" className="text-gray-300 hover:text-white transition">Privacy Policy</Link>
          </div>

          <div className="flex flex-col justify-start items-center gap-y-2 md:items-start md:pl-20">
            <h3 className="text-2xl font-bold mb-4">Follow Us</h3>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition">Facebook</a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition">Twitter</a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition">Instagram</a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition">Linkedin</a>
          </div>

        </div>
      </footer>

      {/* Bottom Text */}
      <div className="text-center text-black font-black text-2xl h-fit my-6">
          <p>&copy; {new Date().getFullYear()} QR Menu App. All rights reserved.</p>
        </div>

    </div>
  );
}
