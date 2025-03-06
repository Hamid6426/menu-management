const Careers = () => {
  return (
    <div className="bg-red-600 text-white min-h-screen py-8 px-6">
      <h1 className="text-4xl font-bold text-center mb-6">Careers at QR-Menu</h1>
      <p className="text-center mb-4">Join our team and shape the future of restaurant tech!</p>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold">Open Positions</h2>
          <ul className="list-disc list-inside">
            <li>Frontend Developer (React.js)</li>
            <li>Backend Developer (Node.js, MongoDB)</li>
            <li>UI/UX Designer</li>
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-semibold">Why Work With Us?</h2>
          <p>We offer competitive salaries, flexible work hours, and opportunities to work on cutting-edge technology.</p>
        </div>
      </div>
    </div>
  );
};

export default Careers;
