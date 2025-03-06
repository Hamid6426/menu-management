export default function Subscription() {
  const subscriptions = [
    {
      name: "Basic Plan",
      price: "$19.99/month",
      features: [
        "1 Restaurant",
        "Admin Dashboard",
        "QR-Based Menu",
      ],
    },
    {
      name: "Standard Plan",
      price: "$49.99/month",
      features: [
        "2 Restaurants",
        "Admin Dashboard",
        "QR-based Menu - Advanced",
      ],
    },
    {
      name: "Premium Plan",
      price: "$99.99/month",
      features: [
        "Inc. Standard",
        "3 Restaurants",
        "Store Analytics"
      ],
    },
  ];

  const handleContactSales = (plan) => {
    alert(`Contact Sales for the ${plan}`);
  };

  return (
    <div className="w-full min-h-screen px-6">
      <h2 className="text-3xl font-black my-4">Subscription Plans</h2>
      <div className="flex flex-wrap justify-start gap-6">
        {subscriptions.map((sub, index) => (
          <div
            key={index}
            className="w-[320px] bg-white shadow-lg rounded-lg p-6 text-center border border-gray-300"
          >
            <h2 className="text-2xl font-bold mb-3">{sub.name}</h2>
            <p className="text-xl font-semibold text-gray-700 mb-4">{sub.price}</p>
            <ul className="mb-6 text-left">
              {sub.features.map((feature, idx) => (
                <li key={idx} className=" text-gray-600 mb-2">
                  • {feature}
                </li>
              ))}
            </ul>
            <button
              onClick={() => handleContactSales(sub.name)}
              className="w-full py-2 px-4 bg-red-600 font-bold text-white rounded-lg hover:bg-rose-600"
            >
              Contact Sales
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
