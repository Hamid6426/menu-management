const About = () => {
  return (
    <div className="bg-white text-black py-8 px-4 lg:px-12 w-full">
      <div className="mx-auto max-w-[768px]">
      <h1 className="text-4xl font-bold text-center mb-8 text-red-600">About QR-Menu Web App</h1>
      
      <p className="text-lg leading-8">
        The <span className="text-red-600 font-semibold">QR-Menu Web App</span> is an innovative platform designed to digitize restaurant operations. 
        With dynamic QR code scanning, customers can browse menus, place orders, and make payments effortlessly. 
        The app offers dedicated dashboards for managers, cooks, waiters, and customers, streamlining operations and improving efficiency.
      </p>
      
      <p className="text-lg leading-8 mt-4">
        Built with cutting-edge technologies like <span className="font-semibold">React.js, Node.js, and MongoDB</span>, the platform is scalable and 
        supports multi-tenancy, allowing multiple restaurants to operate independently. Role-based access control ensures data security and usability across 
        all user types.
      </p>
    </div>
    </div>
  );
};

export default About;