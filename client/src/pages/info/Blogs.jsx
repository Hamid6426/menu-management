const Blogs = () => {
  const blogPosts = [
    {
      title: "How Digital Menus Are Transforming the Restaurant Industry",
      description: "Explore how digital menus can improve customer experience and streamline restaurant operations.",
      link: "/blog/digital-menus-transforming",
    },
    {
      title: "Optimizing Restaurant Operations with SaaS Solutions",
      description: "Learn how SaaS-based solutions are revolutionizing restaurant operations, from order management to payments.",
      link: "/blog/saas-solutions-for-restaurants",
    },
    {
      title: "The Benefits of QR Code Ordering for Customers and Restaurants",
      description: "Understand how QR code-based ordering enhances customer experience and boosts restaurant efficiency.",
      link: "/blog/qr-code-ordering-benefits",
    },
    {
      title: "Why Your Restaurant Needs an Integrated Payment System",
      description: "A deep dive into the importance of integrated payment systems for smooth and secure transactions in the restaurant business.",
      link: "/blog/integrated-payment-system",
    },
    {
      title: "Managing Staff and Operations in Multi-Restaurant Setups",
      description: "Best practices for managing multiple restaurants under one platform, with role-based dashboards for better efficiency.",
      link: "/blog/multi-restaurant-management",
    },
  ];

  return (
    <div className=" text-black min-h-screen py-8 px-6">
      <h1 className="text-4xl font-bold text-center mb-6">Our Latest Blogs</h1>
      <p className="text-center mb-8">Discover our latest insights and articles on the restaurant tech industry and best practices for running a successful digital restaurant.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.map((post, index) => (
          <div key={index} className="drop-shadow-2xl shadow-2xl bg-white p-6 rounded-lg hover:shadow-2xl transition-shadow duration-300">
            <h2 className="text-2xl font-semibold mb-4">{post.title}</h2>
            <p className="text-gray-700 mb-4">{post.description}</p>
            <a
              href={post.link}
              className="text-red-600 font-semibold hover:text-red-800"
            >
              Read More
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
