const FAQs = () => {
  return (
    <div className="bg-[#ff0] text-black min-h-screen py-8 px-6">
      <h1 className="text-4xl font-bold text-center mb-6">Frequently Asked Questions</h1>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold">General</h2>
          <p>What is the QR-Menu Web App?</p>
          <p className="text-gray-700">It is a platform for restaurants to digitize menus, orders, and staff operations.</p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold">For Managers</h2>
          <p>How do I update the restaurant menu?</p>
          <p className="text-gray-700">Go to your Manager Dashboard and navigate to Menu Management.</p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold">For Customers</h2>
          <p>How can I view a restaurant&apos;s menu?</p>
          <p className="text-gray-700">Scan the QR code provided at the restaurant to access the menu.</p>
        </div>
      </div>
    </div>
  );
};

export default FAQs;
