import { Link, useLocation } from 'react-router-dom';
import { MdDashboard, MdMenuBook, MdPeople, MdSettings, MdStore } from 'react-icons/md'; // Import MD icons
import Logout from '../LogOut';

export default function AdminNavbar() {
  const location = useLocation();

  const links = [
    { to: "/admin/dashboard", label: "Dashboard", icon: <MdDashboard size={24} /> },
    { to: "/admin/stores", label: "Stores", icon: <MdStore size={24} /> },
    { to: "/admin/workers", label: "Workers", icon: <MdPeople size={24} /> },
    { to: "/admin/menu", label: "Menu", icon: <MdMenuBook size={24} /> },
    { to: "/admin/account-settings", label: "Account Settings", icon: <MdSettings size={24} /> },
  ];

  return (
    <div className='h-full w-20 bg-red-600 transition-all duration-500 flex flex-col'>
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
      <Logout/>
    </div>
  );
}
