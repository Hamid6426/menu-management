const TermsAndConditions = () => {
  return (
    <div className="bg-white text-black py-8 px-4 lg:px-12">
      <h1 className="text-4xl font-bold text-center mb-8 text-red-600">Terms and Conditions</h1>
      
      <section className="space-y-6">
        <p className="text-lg leading-8">
          These Terms and Conditions govern your use of the <span className="text-red-600 font-semibold">QR-Menu Web App</span>. 
          By accessing or using our platform, you agree to comply with these terms.
        </p>

        <div>
          <h2 className="text-2xl font-semibold text-black">1. Acceptance of Terms</h2>
          <p className="text-lg leading-8">
            By signing up for or using our platform, you confirm that you agree to abide by these terms and conditions. 
            If you do not agree, please refrain from using the service.
          </p>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold text-black">2. User Responsibilities</h2>
          <ul className="list-disc pl-6 text-lg">
            <li>Provide accurate and up-to-date information when creating an account.</li>
            <li>Ensure your account credentials are secure and not shared with others.</li>
            <li>Use the platform only for its intended purpose and refrain from illegal activities.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-black">3. Payment and Subscriptions</h2>
          <p className="text-lg leading-8">
            All payments made through the platform are processed securely. Subscription fees are non-refundable, and 
            users must ensure timely payments to maintain access to premium features.
          </p>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold text-black">4. Limitation of Liability</h2>
          <p className="text-lg leading-8">
            We are not liable for any indirect, incidental, or consequential damages arising from the use of our platform. 
            Use the app at your own discretion and risk.
          </p>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold text-black">5. Changes to These Terms</h2>
          <p className="text-lg leading-8">
            We reserve the right to update these terms and conditions at any time. Continued use of the platform 
            after updates signifies acceptance of the new terms.
          </p>
        </div>
      </section>
    </div>
  );
};

export default TermsAndConditions;
