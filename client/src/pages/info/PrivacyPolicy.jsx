const PrivacyPolicy = () => {
  return (
    <div className="bg-white text-black py-8 px-4 lg:px-12">
      <h1 className="text-4xl font-bold text-center mb-8 text-red-600">Privacy Policy</h1>
      
      <section className="space-y-6">
        <p className="text-lg leading-8">
          At <span className="text-red-600 font-semibold">QR-Menu Web App</span>, we value your privacy and are committed to protecting your personal information. 
          This Privacy Policy outlines how we collect, use, and safeguard your data when using our platform.
        </p>

        <div>
          <h2 className="text-2xl font-semibold text-black">1. Information We Collect</h2>
          <ul className="list-disc pl-6 text-lg">
            <li>Personal Information: Name, email address, contact information, etc., when signing up or using the app.</li>
            <li>Usage Data: Details about your interaction with the app, including device information and browsing patterns.</li>
            <li>Payment Information: Securely processed via trusted third-party gateways like Stripe or PayPal.</li>
          </ul>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold text-black">2. How We Use Your Information</h2>
          <ul className="list-disc pl-6 text-lg">
            <li>To provide and improve our services, such as menu management and order processing.</li>
            <li>To communicate with you regarding updates, promotions, or technical issues.</li>
            <li>To ensure secure transactions and prevent unauthorized access.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-black">3. Data Security</h2>
          <p className="text-lg leading-8">
            We implement industry-standard measures to protect your data, including encryption, secure servers, and regular security audits. However, 
            no method of transmission over the internet is completely secure, and we cannot guarantee absolute security.
          </p>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold text-black">4. Changes to This Policy</h2>
          <p className="text-lg leading-8">
            We reserve the right to update this Privacy Policy at any time. We encourage users to review this page periodically for any changes.
          </p>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
