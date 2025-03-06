import { Link, useLocation } from 'react-router-dom'; // Use Link instead of <a>

export default function Navbar() {
  const location = useLocation();

  const links = [
    { to: "/", label: "HOME" },
    { to: "/about", label: "ABOUT" },
    { to: "/contact", label: "CONTACT" },
    { to: "/blogs", label: "BLOGS" },
    { to: "/how-to-use", label: "HOW TO USE" },
  ];

  return (
    <>
    <div className="bg-red-600 fixed top-0 left-0 w-full h-20 flex flex-row justify-between items-center pr-6 drop-shadow-md z-10">
      <div>
        <img src="/logo.svg" width="140" height="100" alt="Company Logo" className="h-12" />
      </div>
      <div className='flex gap-6 items-center'>
      <div className="gap-6 text-small font-black flex flex-row justify-end">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`hover:text-black ${
              location.pathname === link.to ? "text-yellow" : "text-white"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>
      <a href='/auth/register' className='py-2 px-4 bg-transparent border-2 border-white text-white font-black hover:text-[#f55] hover:bg-white'>Register Your Store</a>
    </div>
    </div>
    </>
  );
}