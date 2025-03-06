const HowToUse = () => {
  return (
    <div className="bg-white text-black py-8 px-4 lg:px-12">
      <h1 className="text-4xl font-bold text-center mb-8 text-red-600">How to Use the QR-Menu Web App</h1>
      
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-black mb-2">For Customers:</h2>
          <ul className="list-disc pl-6 text-lg">
            <li>Scan the QR code provided at the restaurant table using your mobile device.</li>
            <li>Browse the restaurant’s dynamic menu and select your desired items.</li>
            <li>Customize your order and submit it for preparation.</li>
            <li>Complete payment securely via the integrated payment gateway.</li>
          </ul>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold text-black mb-2">For Managers:</h2>
          <ul className="list-disc pl-6 text-lg">
            <li>Log in to your dashboard using the restaurant manager credentials.</li>
            <li>Manage the restaurant menu by adding, updating, or deleting items.</li>
            <li>Assign staff roles and monitor their activities in real-time.</li>
            <li>Customize restaurant settings such as name, theme, or subscription preferences.</li>
          </ul>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold text-black mb-2">For Cooks:</h2>
          <ul className="list-disc pl-6 text-lg">
            <li>Log in to the Cook Dashboard to view the list of orders.</li>
            <li>Update the preparation status of orders (e.g., pending, in-progress, ready).</li>
            <li>Mark items as unavailable based on stock or preparation constraints.</li>
          </ul>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold text-black mb-2">For Waiters:</h2>
          <ul className="list-disc pl-6 text-lg">
            <li>Track and update customer orders and their statuses.</li>
            <li>Assign orders to specific tables and manage real-time updates.</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default HowToUse;