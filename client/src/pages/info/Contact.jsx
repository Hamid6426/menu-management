const Contact = () => {
  return (
    <div className="bg-white text-black py-8 px-4 lg:px-12">
      <h1 className="text-4xl font-bold text-center mb-8 text-red-600">Contact Us</h1>
      
      <p className="text-lg leading-8 text-center mb-8">
        Have questions or need assistance? Reach out to us using the details below.
      </p>
      
      <div className="space-y-6">
        <div className="text-lg">
          <h2 className="text-2xl font-semibold text-black">Email:</h2>
          <p>support@qrmenuapp.com</p>
        </div>
        
        <div className="text-lg">
          <h2 className="text-2xl font-semibold text-black">Phone:</h2>
          <p>+1-800-555-QRAPP</p>
        </div>
        
        <div className="text-lg">
          <h2 className="text-2xl font-semibold text-black">Address:</h2>
          <p>123 QR Menu Avenue, Food City, CA 90210</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
