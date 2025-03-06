import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MdDashboard, MdMenu, MdSettings } from 'react-icons/md'; // Import MD icons

export default function WaiterNavbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false); // State for sidebar width

  const links = [
    { to: "/waiter/dashboard", label: "Dashboard", icon: <MdDashboard /> },
    { to: "/waiter/settings", label: "Settings", icon: <MdSettings /> },
];

  return (
    <div
      className={`min-h-screen bg-red-600 transition-all duration-500 ${
        isOpen ? 'w-52' : 'w-14'
      } flex flex-col`}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`text-white py-3 px-3 hover:text-black 
          ${ isOpen ? 'self-start' : 'self-center'} 
        `}
      >
        <MdMenu size={24} />
      </button>
      {/* Sidebar Links */}
      {links.map((link) => (
        <Link
          key={link.to}
          to={link.to}
          className={`flex items-center py-3 px-3 ${
            isOpen ? 'justify-start' : 'justify-center'
          } w-full hover:text-black ${
            location.pathname === link.to ? 'text-yellow' : 'text-white'
          }`}
        >
          <div className="text-2xl">{link.icon}</div> {/* Display the icon */}
          {isOpen && <span className="text-sm ml-3">{link.label}</span>} {/* Show label if open */}
        </Link>
      ))}
    </div>
  );
}