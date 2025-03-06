const RefundPolicy = () => {
  return (
    <div className="bg-red-600 text-white min-h-screen py-8 px-6">
      <h1 className="text-4xl font-bold text-center mb-6">Refund and Cancellation Policy</h1>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold">Refund Policy</h2>
          <p>Refunds will be issued under the following conditions:</p>
          <ul className="list-disc list-inside">
            <li>If the service is not delivered as promised.</li>
            <li>If you cancel within the first 14 days of subscription.</li>
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-semibold">Cancellation Policy</h2>
          <p>You can cancel your subscription anytime from your Manager Dashboard. Your subscription will remain active until the current billing cycle ends.</p>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;
