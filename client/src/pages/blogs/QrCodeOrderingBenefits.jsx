const QrCodeOrderingBenefits = () => {
  return (
    <div className="bg-white text-black min-h-screen py-8 px-6">
      <h1 className="text-4xl font-bold text-center mb-6">The Benefits of QR Code Ordering for Customers and Restaurants</h1>
      <p className="text-xl text-gray-700 mb-4">
        QR code ordering has become one of the most popular methods for modernizing restaurant dining. This contactless technology is easy to use and provides numerous benefits to both customers and restaurant owners.
      </p>

      <h2 className="text-2xl font-semibold mb-4">Advantages for Customers</h2>
      <ul className="list-disc list-inside text-gray-700">
        <li>Contactless ordering reduces the risk of contamination and enhances hygiene.</li>
        <li>Convenient and fast ordering process, enabling customers to browse menus at their own pace.</li>
        <li>Real-time updates on order status, providing transparency throughout the dining experience.</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4">Advantages for Restaurants</h2>
      <ul className="list-disc list-inside text-gray-700">
        <li>Improved order accuracy with digital submissions, reducing human errors.</li>
        <li>Streamlined operations by automating the order-to-kitchen process.</li>
        <li>Better customer data tracking, helping restaurants personalize marketing efforts.</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4">Conclusion</h2>
      <p className="text-gray-700">
        QR code ordering is a win-win for both customers and restaurants. It offers efficiency, accuracy, and safety while enhancing the overall dining experience.
      </p>

      <a href="/blogs" className="text-red-600 font-semibold hover:text-red-800 mt-6 inline-block">Back to Blogs</a>
    </div>
  );
};

export default QrCodeOrderingBenefits;
