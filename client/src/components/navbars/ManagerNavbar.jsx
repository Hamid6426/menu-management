import { Link, useLocation } from 'react-router-dom';
import { MdDashboard, MdGroup, MdRestaurantMenu, MdSettings } from 'react-icons/md'; // Import MD icons

export default function ManagerNavbar() {
  const location = useLocation();

  const links = [
    { to: "/manager/dashboard", label: "Dashboard", icon: <MdDashboard size={24} /> },
    { to: "/manager/manage-menu", label: "Manage Menu", icon: <MdRestaurantMenu size={24} /> },
    { to: "/manager/manage-users", label: "Manage Users", icon: <MdGroup size={24} /> },
    { to: "/manager/settings", label: "Settings", icon: <MdSettings size={24} /> },
  ];

  return (
    <div
      className={`min-h-screen w-16 bg-red-600 transition-all duration-500 flex flex-col`}
    >

      {/* Sidebar Links */}
      <div className='h-full'>
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`flex items-center px-3 py-2 flex-col text-center justify-center 
            w-full hover:text-black ${location.pathname === link.to ? 'text-yellow' : 'text-white'
              }`}
          >
            <div className="text-2xl">{link.icon}</div> {/* Display the icon */}
            <span className="text-xs mt-1">{link.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
